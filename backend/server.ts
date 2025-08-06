import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Type definitions
interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
}

interface JWTPayload {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Google OAuth client
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5173/auth/google/callback'
);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// In-memory user storage (in production, use a real database)
const users = new Map<string, User>();

// Helper function to generate JWT token
function generateToken(user: JWTPayload): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return jwt.sign(user, secret, { expiresIn: '7d' });
}

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Forahia Store Backend is running!' });
});

// Start Google OAuth flow
app.get('/auth/google', (req, res) => {
  const authUrl = googleClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['openid', 'profile', 'email'],
    include_granted_scopes: true,
  });
  
  res.redirect(authUrl);
});

// Handle Google OAuth callback
app.post('/auth/google/callback', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Exchange authorization code for tokens
    const { tokens } = await googleClient.getToken(code);
    googleClient.setCredentials(tokens);

    // Get user info from Google
    if (!tokens.id_token) {
      return res.status(400).json({ error: 'No ID token received' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ error: 'Invalid token payload' });
    }

    const googleUser: User = {
      id: payload.sub || '',
      email: payload.email || '',
      firstName: payload.given_name || '',
      lastName: payload.family_name || '',
      picture: payload.picture,
      username: payload.email?.split('@')[0] || '',
    };

    // Store or update user
    users.set(googleUser.id, googleUser);

    // Generate JWT token for our app
    const token = generateToken({
      id: googleUser.id,
      username: googleUser.username,
      email: googleUser.email,
      firstName: googleUser.firstName,
      lastName: googleUser.lastName,
    });

    res.json({
      success: true,
      user: {
        username: googleUser.username,
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        email: googleUser.email,
        jwt: token,
      }
    });

  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Verify JWT token (for protected routes)
app.get('/auth/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const decoded = jwt.verify(token, secret) as JWTPayload;
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Get user profile
app.get('/user/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const decoded = jwt.verify(token, secret) as JWTPayload;
    const user = users.get(decoded.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
  // next is required for Express error middleware signature
  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📱 Frontend should be running on ${process.env.FRONTEND_URL}`);
});

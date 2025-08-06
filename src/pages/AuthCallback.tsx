import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks';
import { loginUser } from '@/features/user/userSlice';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        toast({
          description: 'Google authentication cancelled',
          variant: 'destructive'
        });
        navigate('/login');
        return;
      }

      if (!code) {
        toast({
          description: 'No authorization code received',
          variant: 'destructive'
        });
        navigate('/login');
        return;
      }

      try {
        // Send code to backend for token exchange
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/google/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (data.success && data.user) {
          // Login user with the data from backend
          dispatch(loginUser(data.user));
          toast({ description: 'Successfully logged in with Google!' });
          navigate('/');
        } else {
          throw new Error(data.error || 'Authentication failed');
        }
      } catch (error) {
        console.error('Google authentication error:', error);
        toast({
          description: 'Google authentication failed',
          variant: 'destructive'
        });
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, dispatch, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Completing Google authentication...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthCallback;

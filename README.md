# Forahia Store

A modern e-commerce application built with React, TypeScript, and Redux Toolkit. This project features a complete online store with product browsing, cart management, user authentication, and order processing.

## 🚀 Features

- **Product Catalog**: Browse products with search, filtering, and pagination
- **Shopping Cart**: Add, remove, and modify items in your cart
- **User Authentication**: Register, login, and guest user functionality
- **Order Management**: Place orders and view order history
- **Responsive Design**: Mobile-friendly interface with dark/light theme support
- **State Management**: Powered by Redux Toolkit with persistent cart storage
- **Modern UI**: Built with Shadcn/UI components and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Redux Toolkit, React Redux
- **Routing**: React Router v6
- **Styling**: Tailwind CSS, Shadcn/UI
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Backend API**: Strapi Store Server

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Chi-G/forahia-store.git
   cd forahia-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code linting

## 🏗️ Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── CartButton.tsx
│   ├── Header.tsx
│   ├── Navbar.tsx
│   └── ...
├── features/           # Redux slices
│   ├── cart/
│   ├── theme/
│   └── user/
├── pages/              # Route components
│   ├── Landing.tsx
│   ├── Products.tsx
│   ├── Cart.tsx
│   └── ...
├── utils/              # Utility functions
│   ├── customFetch.ts
│   ├── types.ts
│   └── ...
├── assets/             # Static assets
├── hooks.ts            # Custom Redux hooks
├── store.ts            # Redux store configuration
└── main.tsx            # Application entry point
```

## 🔗 API

This project uses the [Strapi Store Server API](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi) for backend functionality.

**Base URL**: `https://strapi-store-server.onrender.com/api`

### Key Endpoints

- `GET /products` - Fetch products with filtering
- `GET /products/:id` - Fetch single product
- `POST /auth/local/register` - User registration
- `POST /auth/local` - User login
- `GET /orders` - Fetch user orders
- `POST /orders` - Create new order

## 🎨 UI Components

This project uses [Shadcn/UI](https://ui.shadcn.com/) components built on top of Radix UI primitives:

- Button, Card, Input, Select
- Dropdown Menu, Pagination, Toast
- Skeleton, Separator, Checkbox
- Carousel, Table, and more

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality as the project uses a public API.

### Tailwind CSS

Custom classes are defined in `src/index.css`:

```css
@layer components {
  .align-element {
    @apply mx-auto max-w-6xl px-8;
  }
}
```

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Netlify Deployment

This project includes a `public/_redirects` file for Netlify deployment:

```text
/* /index.html 200
```

This ensures that client-side routing works correctly in production.

## 🔍 Key Features Deep Dive

### Redux State Management

- **Cart State**: Persistent cart with localStorage
- **User State**: Authentication and user preferences
- **Theme State**: Dark/light mode with system preference detection

### Routing

- **Protected Routes**: Checkout and Orders require authentication
- **Dynamic Routes**: Product details with URL parameters
- **Error Boundaries**: Custom error pages for 404 and general errors

### UI/UX

- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton components during data fetching
- **Toast Notifications**: User feedback for actions
- **Accessibility**: ARIA labels and semantic HTML

## 🧪 Testing

Currently, this project doesn't include tests, but you can add them using:

- **Unit Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright or Cypress
- **Type Checking**: TypeScript compiler

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Chijindu Nwokeohuru**

- Email: chijindu.nwokeohuru@gmail.com

## 🙏 Acknowledgments

- [Shadcn/UI](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Router](https://reactrouter.com/) - Client-side routing

---

⭐ If this project helped you, please give it a star on GitHub!

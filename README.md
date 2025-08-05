# Forahia Store

A modern e-commerce platform built with React, TypeScript, and Redux Toolkit. Forahia Store provides a seamless online shopping experience with advanced product management, secure user authentication, and streamlined checkout processes.

## 🚀 Features

- **Comprehensive Product Catalog**: Advanced search, filtering, and pagination
- **Smart Shopping Cart**: Real-time cart management with persistent storage
- **Secure User Authentication**: Account registration, login, and guest checkout
- **Order Management System**: Complete order tracking and history
- **Responsive Design**: Optimized for all devices with dark/light theme support
- **Performance Optimized**: Built with modern technologies for fast loading
- **Professional UI**: Clean, modern interface using Shadcn/UI components

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit with React Redux
- **Routing**: React Router v6 for seamless navigation
- **Styling**: Tailwind CSS with Shadcn/UI component library
- **HTTP Client**: Axios for API communication
- **Build Tool**: Vite for optimal performance
- **Backend Integration**: Strapi Store Server API

## � Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/Chi-G/forahia-store.git
   cd forahia-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Launch the application**

   ```bash
   npm run dev
   ```

4. **Access the store**

   Open your browser and navigate to `http://localhost:5173`

## 📝 Development Scripts

- `npm run dev` - Launch development server
- `npm run build` - Build for production deployment
- `npm run preview` - Preview production build locally
- `npm run lint` - Run code quality checks

## 🏗️ Application Architecture

```text
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI component library
│   ├── CartButton.tsx  # Shopping cart functionality
│   ├── Header.tsx      # Main navigation header
│   ├── Navbar.tsx      # Navigation bar
│   └── ...
├── features/           # Redux state management
│   ├── cart/           # Shopping cart state
│   ├── theme/          # UI theme management
│   └── user/           # User authentication state
├── pages/              # Application pages
│   ├── Landing.tsx     # Homepage
│   ├── Products.tsx    # Product catalog
│   ├── Cart.tsx        # Shopping cart page
│   └── ...
├── utils/              # Utility functions and helpers
│   ├── customFetch.ts  # API client configuration
│   ├── types.ts        # TypeScript type definitions
│   └── ...
├── assets/             # Static assets and images
├── hooks.ts            # Custom React hooks
├── store.ts            # Redux store configuration
└── main.tsx            # Application entry point
```

## 🔗 API Integration

Forahia Store integrates with the [Strapi Store Server API](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi) for comprehensive e-commerce functionality.

**API Base URL**: `https://strapi-store-server.onrender.com/api`

### Core API Endpoints

- `GET /products` - Retrieve product catalog with filtering options
- `GET /products/:id` - Get detailed product information
- `POST /auth/local/register` - Customer account registration
- `POST /auth/local` - User authentication
- `GET /orders` - Retrieve customer order history
- `POST /orders` - Process new orders

## 🎨 UI Design System

Forahia Store features a modern, professional design built with [Shadcn/UI](https://ui.shadcn.com/) components and Radix UI primitives:

**Core Components**: Button, Card, Input, Select, Dropdown Menu, Pagination, Toast  
**Advanced Components**: Skeleton loaders, Separator, Checkbox, Carousel, Data tables  
**Accessibility**: Full ARIA support and keyboard navigation

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

## 🔍 Platform Features

### E-commerce Capabilities

- **Product Management**: Advanced catalog with search, filtering, and sorting
- **Shopping Experience**: Persistent cart with real-time updates
- **User Accounts**: Secure authentication with order history tracking
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Technical Excellence

- **State Management**: Centralized Redux store with persistent data
- **Routing System**: Protected routes and dynamic navigation
- **Performance**: Optimized loading with skeleton states and lazy loading
- **User Experience**: Toast notifications, error handling, and accessibility features

## 🧪 Quality Assurance

Forahia Store is built with quality in mind. Future enhancements may include:

- **Unit Testing**: Vitest with React Testing Library
- **End-to-End Testing**: Playwright or Cypress integration
- **Type Safety**: Comprehensive TypeScript coverage
- **Code Quality**: ESLint and Prettier configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

### Chijindu Nwokeohuru

- Email: [chijindu.nwokeohuru@gmail.com](mailto:chijindu.nwokeohuru@gmail.com)

## 🙏 Acknowledgments

- [Shadcn/UI](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Router](https://reactrouter.com/) - Client-side routing

---

⭐ If this project helped you, please give it a star on GitHub!

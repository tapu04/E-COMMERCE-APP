# E-Commerce Application

![Project Logo](./frontend/src/assets/logo.png)

A full-featured e-commerce platform with separate frontend for customers and admin panel for store management.

## Project Overview

This project is a complete e-commerce solution with:

- Customer-facing storefront (frontend)
- Admin dashboard for product and order management
- RESTful API backend with MongoDB database
- Authentication system for customers and administrators
- Payment processing integration (Razorpay, Stripe)
- Product catalog with categories, filters, and search
- Shopping cart and order management
- Image upload and storage using Cloudinary

## Tech Stack

### Frontend (Customer Interface)
- React 19
- React Router DOM 7
- Tailwind CSS 4
- Axios for API requests
- React Toastify for notifications
- Vite build system

### Admin Panel
- React 19
- Tailwind CSS 4
- Protected routes for admin access
- Product management interface
- Order processing system

### Backend
- Express.js 5
- MongoDB with Mongoose 8
- JWT authentication
- Multer for file uploads
- Cloudinary for image storage
- Bcrypt for password hashing
- CORS enabled API
- Payment processing (Razorpay/Stripe)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- Cloudinary account
- Stripe/Razorpay account for payments

### Installation

1. Clone the repository
```bash
git clone https://github.com/tapu04/E-COMMERCE-APP.git
cd ecommerce-app
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Create a .env file in the backend directory with:
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Note: The backend also expects the allowed client origins for CORS to be provided via environment variables. Add these if you run frontend and admin on different hosts/ports (common in development):

```
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

5. Create a .env file in the frontend directory with:
```
VITE_BACKEND_URL=http://localhost:4000
```

6. Install admin dependencies
```bash
cd ../admin
npm install
```

7. Create a .env file in the admin directory with:
```
VITE_BACKEND_URL=http://localhost:4000
```

Note: The frontend and admin apps use the Vite variable `VITE_BACKEND_URL` to locate the backend API. Keep this value in sync with the backend `PORT` / `PORT`-based URL.

### Running the Application

1. Start the backend server
```bash
cd backend
npm run server
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

3. Start the admin development server
```bash
cd admin
npm run dev
```

## Project Structure

```
ecommerce-app/
├── frontend/                # Customer-facing storefront
│   ├── src/
│   │   ├── assets/          # Images and static files
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Entry point
│   └── ...
│
├── admin/                   # Admin dashboard
│   ├── src/
│   │   ├── assets/          # Admin-specific assets
│   │   ├── components/      # Admin UI components
│   │   ├── pages/           # Admin pages (Add, List, Orders)
│   │   ├── App.jsx          # Admin application
│   │   └── main.jsx         # Admin entry point
│   └── ...
│
└── backend/                 # API server
    ├── config/              # Database and cloud service configs
    ├── controllers/         # Request handlers
    ├── middleware/          # Express middleware
    ├── models/              # Mongoose models
    ├── routes/              # API routes
    └── server.js            # Entry point
```

## Features

### Customer Features
- Browse products by category
- Search functionality
- Product detail views
- Shopping cart
- User registration and authentication
- Order history
- Checkout process
- Payment integration

### Admin Features
- Secure login
- Dashboard with metrics
- Product management (add, edit, delete)
- Order management
- User management

## Deployment

The application is configured for deployment on Vercel with separate configurations for frontend, admin, and backend.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

- [tapu04](https://github.com/tapu04)
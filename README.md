# E-Commerce Application

![Project Logo](./frontend/src/assets/logo.png)

A comprehensive full-stack e-commerce platform built with the MERN stack, featuring a customer-facing storefront, admin dashboard, and robust backend API with payment processing capabilities.

## Project Overview

This e-commerce application is a complete online shopping solution designed to provide both customers and administrators with intuitive, feature-rich interfaces. The project demonstrates modern web development practices with a clean, scalable architecture.

### Key Components

- **Customer Storefront**: Modern React-based shopping interface with responsive design
- **Admin Dashboard**: Comprehensive management panel for products, orders, and analytics
- **RESTful API Backend**: Secure Express.js server with MongoDB database
- **Authentication System**: JWT-based security for customers and administrators
- **Payment Processing**: Multi-gateway support (Razorpay, Stripe, Cash on Delivery)
- **Cloud Integration**: Cloudinary for optimized image storage and delivery

## Tech Stack

### Frontend (Customer Interface)

- **React 19** - Latest React with modern features
- **React Router DOM 7** - Client-side routing and navigation
- **Tailwind CSS 4** - Utility-first CSS framework for responsive design
- **Axios** - HTTP client for API communication
- **React Toastify** - User-friendly notification system
- **Vite** - Fast build tool and development server

### Admin Panel

- **React 19** - Consistent framework across applications
- **Tailwind CSS 4** - Unified styling approach
- **Protected Routes** - Secure admin access control
- **Real-time Dashboard** - Live order and product management
- **File Upload Interface** - Drag-and-drop product image management

### Backend

- **Express.js 5** - High-performance web framework
- **MongoDB with Mongoose 8** - NoSQL database with ODM
- **JWT Authentication** - Stateless security tokens
- **Multer** - Middleware for handling file uploads
- **Cloudinary Integration** - Cloud-based image optimization
- **Bcrypt** - Secure password hashing
- **CORS Support** - Cross-origin resource sharing
- **Payment Gateways** - Razorpay and Stripe integration

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (local installation or Atlas cloud)
- **Cloudinary Account** for image storage
- **Payment Gateway Account** (Stripe/Razorpay) for transactions

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/tapu04/E-COMMERCE-APP.git
cd ecommerce-app
```

2. **Setup Backend**

```bash
cd backend
npm install
```

3. **Configure Backend Environment**
   Create a `.env` file in the backend directory:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

4. **Setup Frontend**

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

5. **Setup Admin Panel**

```bash
cd ../admin
npm install
```

Create a `.env` file in the admin directory:

```env
VITE_BACKEND_URL=http://localhost:4000
```

### Running the Application

1. **Start Backend Server**

```bash
cd backend
npm run server
```

Backend will run on `http://localhost:4000`

2. **Start Customer Frontend**

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

3. **Start Admin Dashboard**

```bash
cd admin
npm run dev
```

Admin panel will run on `http://localhost:5174`

## Project Structure

```
ecommerce-app/
├── frontend/                    # Customer-facing storefront
│   ├── src/
│   │   ├── assets/              # Static images and icons
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx       # Navigation component
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   ├── Hero.jsx         # Landing page hero
│   │   │   ├── LatestCollection.jsx
│   │   │   ├── BestSeller.jsx
│   │   │   ├── OurPolicy.jsx
│   │   │   ├── NewsletterBox.jsx
│   │   │   ├── ProductItem.jsx
│   │   │   ├── Title.jsx
│   │   │   ├── CartTotal.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── RelatedProducts.jsx
│   │   ├── context/             # React context providers
│   │   │   └── ShopContext.jsx  # Global state management
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx         # Homepage
│   │   │   ├── Collection.jsx   # Product catalog
│   │   │   ├── About.jsx        # About page
│   │   │   ├── Contact.jsx      # Contact page
│   │   │   ├── Product.jsx      # Product details
│   │   │   ├── Cart.jsx         # Shopping cart
│   │   │   ├── Login.jsx        # Authentication
│   │   │   ├── PlaceOrder.jsx   # Checkout
│   │   │   ├── Orders.jsx       # Order history
│   │   │   └── Verify.jsx       # Payment verification
│   │   ├── App.jsx              # Main application component
│   │   └── main.jsx             # Entry point
│   ├── public/                  # Public assets
│   ├── package.json
│   └── vite.config.js
│
├── admin/                       # Admin dashboard
│   ├── src/
│   │   ├── assets/              # Admin-specific assets
│   │   ├── components/          # Admin UI components
│   │   │   ├── Navbar.jsx       # Admin navigation
│   │   │   └── Sidebar.jsx      # Admin sidebar
│   │   ├── pages/               # Admin pages
│   │   │   ├── Add.jsx          # Add products
│   │   │   ├── List.jsx         # Product listing
│   │   │   └── Orders.jsx       # Order management
│   │   ├── App.jsx              # Admin application
│   │   └── main.jsx             # Admin entry point
│   ├── package.json
│   └── vite.config.js
│
└── backend/                     # API server
    ├── config/                  # Configuration files
    │   ├── mongodb.js           # Database connection
    │   └── cloudinary.js        # Cloud storage config
    ├── controllers/             # Request handlers
    │   ├── productController.js # Product CRUD operations
    │   ├── userController.js    # User authentication
    │   └── orderController.js   # Order processing
    ├── middleware/              # Express middleware
    │   ├── auth.js              # Authentication middleware
    │   ├── adminAuth.js         # Admin authorization
    │   └── multer.js            # File upload handling
    ├── models/                  # Mongoose models
    │   ├── productModel.js      # Product schema
    │   ├── userModel.js         # User schema
    │   └── orderModel.js        # Order schema
    ├── routes/                  # API routes
    │   ├── productRoute.js      # Product endpoints
    │   ├── userRoute.js         # User endpoints
    │   └── orderRoute.js        # Order endpoints
    ├── uploads/                 # Temporary file storage
    ├── package.json
    └── server.js                # Entry point
```

## Features

### Customer Experience

- **Product Catalog**: Browse products with category filtering and search
- **Product Details**: High-quality images, descriptions, and size options
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: Secure registration and login system
- **Order Management**: Complete checkout process with order tracking
- **Payment Options**: Multiple payment methods (Stripe, Razorpay, COD)
- **Responsive Design**: Mobile-optimized interface
- **Search & Filter**: Advanced product discovery features
- **Order History**: Track past purchases and order status

### Admin Features

- **Secure Dashboard**: Protected admin interface with analytics
- **Product Management**: Add, edit, delete products with image upload
- **Inventory Control**: Track stock levels and product availability
- **Order Processing**: View and update order statuses
- **User Management**: Monitor customer accounts and activities
- **Sales Analytics**: Track revenue and order metrics
- **Content Management**: Update product descriptions and categories
- **Bulk Operations**: Manage multiple products efficiently

### Technical Features

- **RESTful API**: Clean, documented API endpoints
- **JWT Security**: Stateless authentication with refresh tokens
- **Image Optimization**: Cloudinary integration for fast loading
- **Database Indexing**: Optimized MongoDB queries
- **Error Handling**: Comprehensive error management
- **Input Validation**: Server-side data validation
- **CORS Support**: Secure cross-origin requests
- **Environment Configuration**: Flexible deployment settings

## API Endpoints

### Product Routes

- `GET /api/product/list` - Get all products
- `GET /api/product/single/:id` - Get product by ID
- `POST /api/product/add` - Add new product (Admin)
- `DELETE /api/product/remove` - Remove product (Admin)

### User Routes

- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

### Order Routes

- `POST /api/order/place` - Place new order
- `GET /api/order/userorders` - Get user orders
- `GET /api/order/list` - Get all orders (Admin)
- `POST /api/order/status` - Update order status (Admin)

## Deployment

### Environment Setup

The application is configured for deployment on platforms like Vercel, Netlify, or traditional hosting:

- **Frontend**: Static build deployment
- **Admin**: Separate static build
- **Backend**: Node.js server deployment

### Production Configuration

- Environment variables for all services
- MongoDB Atlas for database
- Cloudinary for image storage
- Payment gateway production keys
- CORS configuration for production domains

## Performance Optimizations

- **Code Splitting**: React lazy loading for better performance
- **Image Optimization**: Cloudinary automatic optimization
- **Database Indexing**: Optimized MongoDB queries
- **Caching**: Strategic use of browser and server caching
- **Bundle Optimization**: Vite production builds
- **CDN Integration**: Fast global content delivery

## Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Tokens**: Stateless authentication
- **Input Validation**: Server-side data sanitization
- **CORS Protection**: Controlled cross-origin access
- **Admin Routes**: Protected administrative endpoints
- **File Upload Security**: Validated file types and sizes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author

**tapu04**

- GitHub: [@tapu04](https://github.com/tapu04)
- Project Repository: [E-Commerce App](https://github.com/tapu04/E-COMMERCE-APP)
- Live Demo:[https://forever-bsj04.vercel.app](https://forever-bsj04.vercel.app)

## Acknowledgments

- React team for the amazing framework
- MongoDB for the flexible database solution
- Cloudinary for image management
- Payment gateway providers for secure transactions
- Open source community for various packages and tools

---

\*Built by Bhabani Shankar Jena

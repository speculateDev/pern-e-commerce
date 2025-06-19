# 🛒 PERN E-commerce App

A modern, full-stack e-commerce web application built with the PERN stack (PostgreSQL, Express.js, React, Node.js). This project showcases essential e-commerce functionality including product management, secure authentication, shopping cart operations, and integrated payment processing.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-%5E18.0.0-blue.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#️-technologies-used)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)

## ✨ Features

### 👤 Customer Features

- **Authentication System**
  - Secure user registration and login with JWT tokens
  - Password encryption and validation
  - Protected routes
- **Product Browsing**
  - Browse comprehensive product catalog
  - Search and filter functionality
  - Detailed product views with images and descriptions
- **Shopping Experience**
  - Add/remove items from shopping cart
  - Update item quantities
  - Persistent cart state (Attached to user in DB)
  - Seamless checkout process
  - Payment processing with Stripe

### 🔧 Admin Features

- **Product Management**

  - Create, read, update, and delete products

## 🛠️ Technologies Used

### Frontend

- **React**
- **Zustand**
- **Axios**
- **TailwindCSS**
- **DaisyUI**

### Backend

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **JWT**

### Database & Hosting

- **Neon**
- **Stripe**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/speculateDev/pern-e-commerce.git
cd pern-e-commerce
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Database Setup

```bash
- Sign up for a Neon account and extract the following values: `PGUSER`, `PGPASSWORD`, `PGHOST`, `PGDATABASE`. Add these to your `.env` file.

- Or Just use a local DB or which ever fit your taste...
```

## 🔧 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
PGUSER=
PGPASSWORD=
PGHOST=
PGDATABASE=

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key

# Stripe Server-Side Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173 (Default Vite)
```

Create a `.env` file in the `frontend` directory:

```env
# Vite requires VITE_ prefix for environment variables
VITE_STRIPE_PUBLISHABLE_KEY=
```

## 🎯 Usage

### Development Mode

You'll need two terminal windows/tabs:

**Terminal 1 - Backend Server:**

```bash
npm run dev
```

**Terminal 2 - Frontend Development Server:**

```bash
cd frontend
npm run dev
```

### Production Build

```bash
# Update .env
Set NODE_ENV=production

# Build frontend for production
npm run build

# Start production server
npm start
```

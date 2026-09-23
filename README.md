# NovaCart - Modern E-Commerce Platform 🛒

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg)](https://vitejs.dev/)

**NovaCart** is a modern, enterprise-grade e-commerce application inspired by leading marketplaces like **Flipkart** and **Amazon**. It features a clean shopping interface, high conversion workflows, comprehensive user account flows, multi-gateway checkout, live parcel tracking, returns management, tax invoice generation, and an automated **12-Point End-to-End Testing & Verification Suite**.

---

## ✨ Features

NovaCart satisfies all critical e-commerce capabilities:

1. **User Registration**:
   - Fast modal signup with validation (Full Name, Email, Password, Terms agreement).
   - Instant account creation with persistent local session.

2. **User Login & Session Management**:
   - Secure sign-in flow with demo credential autofill.
   - User dropdown menu with order history, address book, wishlist, and session logout.

3. **Product Search & Filtering**:
   - Real-time search with instant keyboard clearing and query debouncing.
   - Multi-category filtering (*Electronics & Laptops*, *Mobiles & Tablets*, *Studio Audio*, *Fashion & Apparel*, *Home & Kitchen*, *Sports*).
   - In-stock filters, sorting by price (*Low to High*, *High to Low*), ratings, and discounts.

4. **Product Details View**:
   - Interactive high-res media gallery with thumbnail switching.
   - Dynamic pricing with discount badges, savings calculation, and stock status.
   - Specification tables, verified customer reviews with breakdown, and direct "Add to Cart" / "Buy Now".

5. **Shopping Cart**:
   - Slide-over drawer with item increment/decrement and deletion.
   - Real-time cart calculation (Subtotal, 18% GST tax, delivery charges, and coupon savings).
   - Free shipping progress bar ($49 threshold) and recommended add-on items.

6. **Wishlist**:
   - One-click heart toggle on catalog cards and product detail views.
   - Dedicated wishlist modal with quick "Move to Cart" action and live counter.

7. **Address Management**:
   - Add, edit, remove, and switch multiple shipping addresses.
   - Supports Address Types (*Home*, *Work*, *Other*) with default address designation and PIN code auto-detection.

8. **Checkout Flow**:
   - Streamlined 3-step checkout:
     - **Step 1**: Delivery address selection & review.
     - **Step 2**: Order summary & coupon promo codes (e.g., `WELCOME10`, `FESTIVE20`).
     - **Step 3**: Payment selection & execution.

9. **Multi-Gateway Payment Simulation**:
   - **Credit / Debit Cards**: Card number format, MM/YY expiry, CVV verification, and 3D Secure simulation.
   - **UPI (Unified Payments Interface)**: Google Pay, PhonePe, Paytm, or custom UPI ID (@okhdfcbank, @okaxis).
   - **Net Banking**: HDFC, ICICI, SBI, Axis, and others.
   - **Cash on Delivery (COD)**: Doorstep cash payment with anti-bot captcha verification.

10. **Order Placement & Confirmation**:
    - Animated confirmation modal with generated Order ID, estimated delivery window, and items recap.
    - Direct actions to track shipment or download official PDF tax invoice.

11. **Live Order Tracking**:
    - Multi-stage timeline (*Order Placed* ➔ *Packed & Dispatched* ➔ *In Transit* ➔ *Out for Delivery* ➔ *Delivered*).
    - Courier partner details, tracking number, current location coordinates, and delivery agent contact.

12. **Order Cancellation & Returns**:
    - Doorstep pickup scheduling with reason selection.
    - Refund method routing (Original Payment Method or NovaCart Wallet balance).
    - Instant automated status updates across order tracking.

13. **Automated Testing Suite (Discrete Access)**:
    - **12 automated end-to-end verification checks** validating the entire user journey.
    - **Discreetly located**: Click the **Verified Shield Icon** on the header logo or select **Testing Checks Suite** in the user profile menu to open the diagnostic suite without cluttering the homepage.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context (`ShopContext`) with persistent LocalStorage

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) version 18 or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/novacart-ecommerce.git

# 2. Navigate to project root
cd novacart-ecommerce

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Building for Production

To create an optimized production build:

```bash
# Build the production bundle into /dist
npm run build

# Preview the production build locally
npm run preview
```

To run TypeScript verification:
```bash
npm run lint
```

---

## 🌐 Deployment Instructions

NovaCart is 100% static-ready and can be directly deployed to any cloud platform:

### 1. Deploy on Vercel
1. Push your code to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `novacart-ecommerce` repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**.

### 2. Deploy on Netlify
1. Connect your repository in [Netlify](https://www.netlify.com/).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Click **Deploy Site**.

### 3. Deploy on Cloudflare Pages
1. In Cloudflare Dashboard, go to **Workers & Pages** ➔ **Create application** ➔ **Pages**.
2. Connect your Git repository.
3. Build command: `npm run build`.
4. Build output directory: `dist`.
5. Click **Save and Deploy**.

### 4. Deploy on GitHub Pages
1. In `vite.config.ts`, set `base: '/<REPO_NAME>/'`.
2. Run `npm run build`.
3. Deploy the `dist` directory using `gh-pages` or a GitHub Actions workflow.

---

## 📁 Project Structure

```text
novacart-ecommerce/
├── public/                 # Static assets
├── src/
│   ├── components/         # Modular UI components
│   │   ├── AddressManager.tsx        # Shipping address management
│   │   ├── AuthModal.tsx             # User registration & login modal
│   │   ├── CartDrawer.tsx            # Slide-over shopping cart
│   │   ├── CheckoutModal.tsx         # 3-step checkout & payment
│   │   ├── Footer.tsx                # E-commerce footer & policies
│   │   ├── Header.tsx                # Amazon/Flipkart navigation header
│   │   ├── HeroBanner.tsx            # Promotional banners & deals
│   │   ├── InvoiceModal.tsx          # Official PDF/printable tax invoice
│   │   ├── OrderCancellationModal.tsx# Cancellation & returns flow
│   │   ├── OrderSuccessModal.tsx     # Order confirmation screen
│   │   ├── OrderTrackingModal.tsx    # Live shipment tracking
│   │   ├── OrdersListModal.tsx       # Orders history & status
│   │   ├── ProductCard.tsx           # Product catalog card
│   │   ├── ProductCatalog.tsx        # Catalog with filters & search
│   │   ├── ProductDetailModal.tsx    # Deep-dive product specification
│   │   ├── TestingSuiteModal.tsx     # 12-flow E2E testing suite
│   │   └── WishlistModal.tsx         # Saved items & quick-cart
│   ├── context/
│   │   └── ShopContext.tsx           # Central store & automated tests
│   ├── App.tsx             # Root application composition
│   ├── index.css           # Tailwind CSS imports & global styles
│   └── main.tsx            # React application entry point
├── index.html              # HTML entry point with metadata
├── package.json            # Scripts & dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration with Tailwind CSS plugin
```

---

## 🧪 E2E Automated Testing Suite

The application includes an internal diagnostic test runner that executes 12 end-to-end integration checks:

| # | Test Journey | Verified Capability |
|---|--------------|---------------------|
| 1 | **User Registration** | Validates new user signup, validation rules, and authentication state |
| 2 | **User Login & Session** | Verifies credential verification, profile sync, and token persistence |
| 3 | **Product Search** | Tests real-time search queries and category filters |
| 4 | **Product Details** | Tests item modal opening, variant selections, and reviews |
| 5 | **Add to Cart** | Verifies cart drawer additions, item counts, and subtotal math |
| 6 | **Wishlist Management** | Tests wishlisting toggles and migration to cart |
| 7 | **Address Management** | Verifies addition, editing, and default address selection |
| 8 | **Checkout Flow** | Tests checkout stepper, promo discount codes, and summary review |
| 9 | **Payment Execution** | Validates multi-gateway simulation (Cards, UPI, COD) |
| 10 | **Order Placement** | Verifies unique Order ID generation and invoice compilation |
| 11 | **Order Tracking** | Tests live delivery progress stages and courier sync |
| 12 | **Order Cancellation** | Verifies return pickup scheduling, refund processing, and status |

**How to Run**:
Click the **"Verified" shield icon** on the NovaCart brand logo in the top header or select **"Testing Checks Suite"** inside the user menu dropdown.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

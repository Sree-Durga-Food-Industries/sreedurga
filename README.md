# Sree Durga Food Industries — E-Commerce Website

> **Status:** Development Preview | **Stack:** Next.js 14 + TypeScript + Tailwind CSS + Zustand

A premium, mobile-first e-commerce website for **Sree Durga Food Industries**, a Chennai-based traditional food business. Built with authentic Tamil heritage aesthetics and modern web performance.

---

## 🌐 Live Preview

Deploy to Vercel to get a live URL like:
```
https://sree-durga-foods.vercel.app
```

---

## 📸 Screenshots

| Page | Description |
|------|-------------|
| **Home** | Hero banner, categories, best sellers, featured products, festival banner |
| **Shop** | Product grid with category filters, price sort, mobile filters |
| **Product** | Image gallery, variant selector, quantity, add to cart, ingredients |
| **Cart** | Item management, quantity update, order summary, free delivery progress |
| **Checkout** | Address form, payment methods (UPI/Card/COD/Bank), order summary |
| **Order Confirmation** | Success message, order number, next steps |
| **Track Order** | Visual timeline with order status |
| **About** | Business story, business information (GST, address) |
| **Contact** | Contact form, business details, map placeholder |
| **Account** | Guest dashboard, login/register placeholder |
| **Admin** | Sales stats, order table, status management preview |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 14 (App Router) | React framework with SSR/SSG |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **State** | Zustand + Persist | Cart state with localStorage |
| **Icons** | Lucide React | Modern icon library |
| **Notifications** | React Hot Toast | Toast messages |
| **Images** | Unsplash (demo) | Product photography placeholders |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone / Download
```bash
cd sree-durga-foods
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.local.example .env.local
# Edit .env.local with your values (optional for dev)
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
sree-durga-foods/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout (Header, Footer, Nav)
│   ├── globals.css               # Global styles + Tailwind
│   ├── shop/
│   │   ├── page.tsx              # Product listing
│   │   └── [slug]/
│   │       └── page.tsx          # Product detail
│   ├── cart/
│   │   └── page.tsx              # Shopping cart
│   ├── checkout/
│   │   └── page.tsx              # Checkout flow
│   ├── order-confirmation/
│   │   └── page.tsx              # Order success
│   ├── track-order/
│   │   └── page.tsx              # Order tracking
│   ├── about/
│   │   └── page.tsx              # About Us
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── account/
│   │   └── page.tsx              # My Account
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard preview
│   └── search/
│       └── page.tsx              # Product search
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Sticky header + search overlay
│   │   ├── Footer.tsx            # Full footer with legal links
│   │   ├── MobileBottomNav.tsx   # Mobile bottom navigation
│   │   └── WhatsAppFloat.tsx     # Floating WhatsApp button
│   ├── product/
│   │   └── ProductCard.tsx       # Reusable product card
│   └── cart/
│       └── StickyCartBar.tsx     # Mobile sticky cart bar
├── data/
│   ├── categories.ts             # 8 product categories
│   └── products.ts               # 12 demo products with variants
├── lib/
│   ├── utils.ts                  # Helpers (formatPrice, cn, etc.)
│   └── store.ts                  # Zustand cart store
├── types/
│   └── index.ts                  # TypeScript interfaces
├── public/                       # Static assets
├── tailwind.config.ts            # Custom theme (colors, fonts)
├── next.config.js                # Next.js config
└── package.json
```

---

## 🎨 Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | `#FDF8F3` | Page background |
| `maroon` | `#8B1538` | Primary brand color |
| `gold` | `#FFD700` | Accents, badges |
| `brown` | `#4A3728` | Text, secondary elements |
| `brown-dark` | `#2C1810` | Headings, hero backgrounds |

### Typography
- **Headings:** Georgia, Noto Serif Tamil (serif)
- **Body:** System UI stack (sans-serif)

### Components
- `.btn-primary` — Gradient maroon button
- `.btn-secondary` — Outlined maroon button
- `.btn-ghost` — Transparent white button (hero)
- `.card` — White rounded card with shadow
- `.input` — Form input with focus states

---

## 🛒 E-Commerce Features

### Customer Facing
- [x] Product catalog with categories
- [x] Product variants (size/weight)
- [x] Shopping cart with persist (localStorage)
- [x] Quantity selector
- [x] Price display (MRP, discount %, final price)
- [x] GST calculation (5%)
- [x] Delivery charge logic (FREE above ₹999)
- [x] Checkout with address capture
- [x] Payment method selection (UPI, Card, COD, Bank Transfer)
- [x] Order number generation (SD202600001 format)
- [x] Order confirmation page
- [x] Order tracking timeline
- [x] Product search
- [x] Mobile-first responsive design
- [x] WhatsApp integration button

### Admin Preview
- [x] Sales dashboard with stats cards
- [x] Recent orders table
- [x] Order status badges

---

## ⚙️ Configuration

### Business Information (Edit in these files)

**Footer, About, Contact pages:**
- Legal Name: Suganya K
- Trade Name: Sree Durga Food Industries
- GST: 33FHSPS6377C1ZR
- Address: No. 135, Village High Road, Sholinganallur, Chennai 600119

**WhatsApp Number:**
- Edit in `components/layout/WhatsAppFloat.tsx`

**Payment Placeholders:**
- Bank details shown in checkout when "Bank Transfer" selected
- Update in `app/checkout/page.tsx`

**Delivery Settings:**
- Free delivery threshold: ₹999 (in `lib/store.ts`)
- Delivery charge: ₹60 (in `lib/store.ts`)
- GST rate: 5% (in `lib/store.ts`)

---

## 🔄 Data Flow

```
Customer browses products → Adds to cart (Zustand store)
  ↓
Cart persists in localStorage
  ↓
Customer proceeds to checkout → Enters address + selects payment
  ↓
Place Order → Generates order number → Clears cart
  ↓
Order Confirmation page with order details
  ↓
Track Order with visual timeline
```

---

## 📱 Mobile Experience

- Sticky header with scroll
- Bottom navigation bar (Home | Shop | Search | Account)
- Sticky cart bar when items in cart
- Large touch-friendly buttons
- Swipe-friendly product cards
- Mobile filter drawer on shop page

---

## 🚀 Deployment (Vercel)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_ORG/sree-durga-foods.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up / Log in with GitHub
3. Click **Add New Project**
4. Import `sree-durga-foods` repository
5. Framework Preset: Next.js
6. Click **Deploy**

### Step 3: Custom Domain (After Purchase)
1. Vercel Project → Settings → Domains
2. Add `sreedurgafoods.com`
3. Follow DNS instructions
4. Update `NEXT_PUBLIC_APP_URL` in environment variables

---

## 🔐 Environment Variables

Create `.env.local`:

```env
# App
NEXT_PUBLIC_APP_URL=https://sreedurgafoods.com

# Auth (generate: openssl rand -base64 32)
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://sreedurgafoods.com

# Payments (Razorpay)
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...

# Email (Zoho)
ZOHO_EMAIL=orders@sreedurgafoods.com
ZOHO_PASSWORD=...

# Storage (Cloudflare R2)
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=sreedurga-products
```

---

## 📝 Demo Content Notice

All products, prices, and images in `data/products.ts` are **demonstration content**.

**Replace before launch:**
- [ ] Product images with real photography
- [ ] Product descriptions with verified information
- [ ] Prices with actual pricing
- [ ] Stock quantities with real inventory
- [ ] Ingredients with verified data
- [ ] Allergen information with accurate details

---

## 🗺️ Roadmap

### Phase 1: Frontend (Current)
- [x] Complete UI/UX
- [x] Cart & checkout flow
- [x] Responsive design
- [x] Demo data

### Phase 2: Backend
- [ ] Node.js API with Express/Fastify
- [ ] PostgreSQL database with Prisma
- [ ] Real order persistence
- [ ] Payment gateway integration (Razorpay)
- [ ] Email notifications

### Phase 3: Admin
- [ ] Full admin dashboard
- [ ] Product CRUD
- [ ] Order management
- [ ] Inventory tracking
- [ ] Invoice generation (PDF)

### Phase 4: Scale
- [ ] Tamil language support
- [ ] Subscription architecture
- [ ] Wholesale/B2B portal
- [ ] Advanced analytics

---

## 📄 License

Private — For Sree Durga Food Industries (Suganya K)

---

## 👤 Business Information

| | |
|---|---|
| **Legal Name** | Suganya K |
| **Trade Name** | Sree Durga Food Industries |
| **Business Type** | Proprietorship |
| **GST** | 33FHSPS6377C1ZR |
| **Address** | No. 135, Village High Road, Sholinganallur, Chennai, Tamil Nadu 600119, India |

---

**Built with ❤️ for authentic Tamil traditional food.**

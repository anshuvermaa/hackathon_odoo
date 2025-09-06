# EcoFinds – Sustainable Secondhand Marketplace  

### ♻️ Project Overview  
EcoFinds is a sustainable secondhand marketplace that connects eco-conscious buyers and sellers. The platform encourages **reuse over disposal**, helping reduce waste while offering affordable and quality products.  

---

## 🎤 Hackathon Pitch  

- **Problem**: Fast fashion and consumer goods industries generate **tons of waste** every year. Many usable items end up in landfills because people don’t have a reliable, simple way to resell them.  
- **Solution**: **EcoFinds** – a secondhand marketplace where anyone can quickly list, discover, and buy pre-loved products. Built with **scalable, clean code** and a focus on sustainability.  
- **Impact**:  
  - Reduces carbon footprint by extending product lifecycle.  
  - Makes eco-friendly living more affordable.  
  - Encourages circular economy and mindful consumption.  

---

## 🚀 Features & Uniqueness  
- **Secondhand Marketplace** – Buy and sell pre-loved items easily.  
- **Authentication & Security** – User registration/login with JWT-based auth.  
- **Product Management** – Add, browse, and view detailed product listings.  
- **Favorites** – Save your favorite items for quick access.  
- **Reviews & Ratings** – Share feedback to build trust among users.  
- **Orders** – Simple order management for buyers.  
- **Clean & Scalable Architecture** – Backend built with TypeScript + Node.js using a class-based modular approach.  
- **Frontend Ready** – Next.js 14 App Router scaffold for clean, responsive UI.  

---

## 🌱 Sustainability Focus  
- **Promotes Reuse** – Every item bought/sold reduces landfill waste.  
- **Eco-friendly Marketplace** – Encourages circular economy.  
- **Digital-First Approach** – Lightweight API + frontend ensures reduced server usage, improving energy efficiency.  
- **Scalable by Design** – Built with local databases (PostgreSQL/MySQL possible) instead of third-party services to avoid hidden dependencies and ensure long-term maintainability.  

---

## 📂 Project Structure  

### Backend (Node.js + TypeScript)  
```
backend/
├── src/
│ ├── controllers/ # Class-based route controllers
│ ├── middleware/ # Auth & validation middleware
│ ├── routes/ # Express routes
│ ├── utils/ # Helpers (DB, JWT, validators)
│ └── index.ts # App entrypoint
├── package.json
├── tsconfig.json
└── .env
```
# ⚡ How to Run Backend  

### Prerequisites  
- Node.js (v18+)  
- npm or pnpm  
- PostgreSQL/MySQL (for production; SQLite can be used for MVP)  

---

### 🛠️ Setup & Commands  

```bash
# 1. Clone the repository
git clone https://github.com/anshuvermaa/hackathon_odoo
cd ecofinds/backend

# 2. Install dependencies
npm install
# or
pnpm install

# 3. Create environment file
cp .env.example .env
# → Update .env with DB connection, PORT, JWT_SECRET

# 4. Run database migrations (if using Prisma)
npx prisma migrate dev --name init

# 5. Start backend server in development
npm run dev

# 🍃 GramBahar | Authentic Taste of Nature

![GramBahar Banner](/public/assets/hero.png)

GramBahar is a modern E-commerce platform dedicated to bringing the authentic flavors of rural Bengal to your doorstep. Specializing in premium **Patali Gur** (Handcrafted Jaggery) and other traditional delicacies, we combine heritage with a seamless digital shopping experience.

## ✨ Key Features

- **🛍️ Premium E-commerce**: A sleek, responsive frontend for discovering and purchasing farm-fresh products.
- **🛡️ Advanced Admin Dashboard**: Fully featured administrative suite with:
  - **Real-time Analytics**: Traffic and conversion insights.
  - **Sales Reporting**: Comprehensive financial summaries and revenue tracking.
  - **Order Management**: Fulfillment center with return/refund processing.
  - **Inventory Control**: Live stock tracking with low-stock alerts.
  - **Content Manager**: Dynamic control over landing page sections.
- **⚡ Optimized Performance**: Nuanced use of `next/dynamic` and `next/image` for lightning-fast loads.
- **🧩 Organized Architecture**: Professional component hierarchy grouped by functional categories.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [CSS Modules](https://github.com/css-modules/css-modules) (Vanilla CSS)
- **Icons**: Emoji-based and SVG icons for a lightweight, expressive UI.
- **Optimization**: Vercel-grade image and code-splitting strategies.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/grambahar.git
   cd grambahar
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Admin Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router pages
│   └── admin/            # Admin Dashboard routes
├── components/
│   ├── admin/            # Grouped Admin-specific modules
│   │   ├── layout/       # Sidebar, Header, Footer
│   │   ├── overview/     # Stats, Analytics, Reports
│   │   └── orders/       # Fulfillment & Returns
│   └── ui/               # Reusable Design System
│       ├── base/         # Buttons, Badges, Cards
│       ├── forms/        # Inputs, Dropdowns
│       └── data/         # Tables, Charts
└── public/               # Static assets (Images, Lottie)
```

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by the GramBahar Team.

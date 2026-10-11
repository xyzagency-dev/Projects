# Vanguard & Stone — Real Estate & Construction Web Platform

A luxury, sellable, and highly scalable web platform designed specifically for **Real Estate Agencies with In-House Architectural & Home Construction Divisions**.

Built with modern high-performance vanilla web standards (HTML5, CSS3, ES6+ JavaScript), zero bloated frameworks, ultra-fast load times, and an architecture ready to plug into headless CMS systems (Strapi, Sanity, Contentful, WordPress REST API) or run as a turnkey standalone high-converting site.

---

## 🌟 Key Sellable Value Propositions

### 1. Dual-Core Business Model
- **Luxury Real Estate Division**: Filterable luxury residences, sky penthouses, waterfront villas, and alpine compounds with live status badges (`For Sale`, `Under Contract`, `Off-Market Exclusive`), high-resolution galleries, and specification sheets.
- **Home & Construction Division**: Showcases turnkey general contracting, 3D BIM architectural modeling, haute gut renovations, and LEED Platinum net-zero engineering.

### 2. Proprietary High-Converting Client Tools
- **Interactive Construction Feasibility & Cost Estimator**:
  - Live calculations for Ground-Up, Historic Gut Renovation, and Architectural Pavilions.
  - Interactive square footage slider (2,500 – 25,000 sq.ft).
  - Dynamic finish tier multiplier (Signature Luxury, Ultra-Prestige Bespoke, Net-Zero Microgrid).
  - Real-time instant breakdowns of structural shell, finishes, MEP & architecture, timeline horizons, and an instant **Feasibility PDF Export trigger**.
- **Luxury Financing & Mortgage ROI Calculator**:
  - Real-time monthly commitment breakdown with jumbo loan interest calculations, luxury property taxes, and hazard insurance.
  - One-click handoff to private wealth consultation desk.
- **Interactive Before/After Structural Transformation Slider**:
  - Drag-enabled reveal slider demonstrating raw structural framing vs finished architectural estate.
- **Side-by-Side Property Comparison Dock**:
  - Floating drawer comparing up to 3 luxury estates on total investment, square footage, price per sq.ft, and bed/bath counts.
- **Saved Private Portfolio System**:
  - Heart bookmarking system saved directly in `localStorage`.
- **Multi-Step VIP Tour & Advisory Booking Modals**:
  - Tailored for high-net-worth individuals and family offices (preferred dates, security coordination notes, NDA requests).

---

## 🎨 Design System & Aesthetics
- **Theme**: Architectural Obsidian (`#0c1017`) and Champagne/Bronze Gold (`#c5a059`).
- **Typography**: `Plus Jakarta Sans` for clean data/specs, `Syne` for modern architectural impact, and `Playfair Display` for editorial luxury accents.
- **Glassmorphic Elevations**: Frosted glass backdrops with 1px border glows and metallic sheen hover states.
- **Responsive & Mobile-First**: Optimized for 4K displays, laptops, tablets, and smartphones.

---

## 📂 Project Architecture

```
Real Estate Agency — Home & Construction/
├── index.html            # Main semantic markup, SEO meta tags, and structured sections
├── css/
│   └── style.css         # Modular CSS custom properties, design tokens & responsive queries
├── js/
│   ├── data.js           # Decoupled mock database (properties, services, portfolio, reviews)
│   └── app.js            # Interactive engine: state management, filtering, calculators, modals
└── README.md             # Documentation, scalability guide & deployment instructions
```

---

## 🚀 How to Run Locally

You can run this project using any static server or Python / Node / PHP / VS Code Live Server:

```powershell
# Option 1: Python HTTP Server
python -m http.server 8080

# Option 2: Node npx serve
npx -y serve .

# Option 3: PHP built-in server
php -S localhost:8080
```
Then navigate to `http://localhost:8080` in your browser.

---

## 🔌 Scalability & Headless CMS Integration

The data layer is completely separated in `js/data.js`. To connect with a headless CMS (e.g. Strapi, Sanity, Supabase, or WordPress):
1. Replace `PROPERTIES_DATA` in `js/data.js` with an `async fetch()` call to your API endpoint.
2. The UI handles rendering automatically through `renderProperties()` in `js/app.js`.

---

## 📜 License & Compliance
Designed for high-end brokerage and master construction firm deployment. Equipped with sample contractor licensing badges for California CSLB, Florida CBC, and New York DCA.

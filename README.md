# ATELIER AURA — Luxury Interior Design Studio & Turnkey Construction Web Application

> **A Turnkey, Scalable & Sellable Digital Platform for Haute Interior Architecture Firms, Luxury Home Builders, and Design-Build General Contractors.**

---

## 🏛️ Executive Overview
**Atelier Aura** is a luxury digital platform engineered to bridge haute interior design with heavy general construction and architectural contracting. Built to position design-build studios as high-ticket authorities ($1M–$15M+ commissions), this platform is crafted to drive client conversions through interactive feasibility calculators, style diagnostics, and project transparency systems.

---

## 💎 Core Sellable & Scalable Modules

### 1. Interactive Turnkey Cost & Scope Estimator
- **Institutional Feasibility Engine**: Clients choose space typologies (Penthouse, Estate Residence, Ground-Up Villa, Boutique Commercial), adjust square footage (1,000–15,000 sq ft), select finish tiers (Refined Studio, Haute Architectural, Bespoke Monumental), and toggle structural engineering add-ons.
- **Dynamic Real-Time Cost Breakdown**: Automatically calculates and separates:
  - Architectural & Permitting Design Fee (14%)
  - Haute Finishes & Materials Sourcing (44%)
  - General Construction & Craft Labor (36%)
  - Site Supervision & Project Management (6%)
- **Proposal Generation**: One-click generation of an Executive Proposal Brief and pre-populated consultation briefing request.

### 2. Interactive Before & After Renovation Transformation Slider
- **Tactile Visual Comparison**: Smooth drag-and-touch split slider comparing raw 1980s interiors with high-end completed architectural spaces.
- **Project Metrics Bar**: Instant display of square footage, execution duration, and structural scope.

### 3. Interactive Style Archetype Finder (Design Diagnostic Quiz)
- **4-Question Intelligent Questionnaire**: Analyzes natural light philosophy, material temperaments, entertaining habits, and culinary focal preferences.
- **Instant Archetype Result**: Diagnoses profiles such as *Japandi Organic Minimalist*, *Haute Biophilic Architecture*, *Continental Neo-Classical*, and *Warm Monumental Brutalism*, with matching tactile color palettes and automatic consultation pre-fill.

### 4. Tactile Material & Finish Studio
- **Curated Quarry & Artisan Specs**: Real-time interactive inspection of *Calacatta Viola Monolithic Marble*, *Smoked American White Oak*, *Hand-Aged Champagne Brass*, and *Washed Belgian Linen*.
- Displays acoustic absorption coefficients, surface treatments, quarry origins, and architectural applications.

### 5. Curated Portfolio & Blueprint Lightbox Modal
- **Dynamic Category Filtering**: Penthouse Renovations, Ground-Up Construction, Bespoke Residential, Commercial & Hospitality.
- **Case Study Modal**: Full gallery thumbnail switcher, project area, budget, duration, lead architect, and comprehensive scope deliverables.

### 6. Interactive Client Portal Simulation (*Aura Track™*)
- **Institutional Client Transparency**: Demonstrates to prospective clients how the firm tracks jobsite milestones in real time.
- **Interactive Change Order Approval**: Clients can simulate approving a change-order slab layout with live digital seal feedback and jobsite log updates.

### 7. Private Consultation Booking & Lookbook Delivery
- Multi-step lead capture qualification form with project budget selectors, city locations, and automated lookbook download system.

---

## ⚡ Tech Stack & Performance Architecture
- **Structure**: Semantic HTML5 with Schema.org JSON-LD structured data (`ArchitecturalFirm`, `LocalBusiness`).
- **Styling**: Vanilla CSS3 Custom Properties (zero bulky CSS dependencies), glassmorphism, responsive grid & flexbox systems.
- **Engine**: Modern ES Modules JavaScript (`js/app.js`) with responsive drag handlers, touch support, and reactive state management.
- **Typography**: Google Fonts (*Cormorant Garamond*, *Plus Jakarta Sans*, *Space Mono*).
- **Assets**: Ultra-high-resolution architectural photography tailored for luxury estates.

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
# or
npm start
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🏷️ How to White-Label & Sell This Website
1. **Change Brand Identity**: Update studio name, logo, and phone in `index.html` and `css/main.css`.
2. **Configure Hourly / Sq. Ft. Rates**: Edit base pricing rates in `js/app.js` (`data-rate` on `.calc-type-card`).
3. **Add Projects**: Simply add entries to `data/projects.json` with your client's custom imagery and specifications.
4. **Deploy Anywhere**: Deploy directly to Vercel, Netlify, Cloudflare Pages, or AWS S3 with zero server configuration.

---
© 2026 Atelier Aura Architectural Group. Designed for High-Ticket Scale.

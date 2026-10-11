# LUMEN & CO. — Fine Art & Commercial Photography Studio

A luxury, scalable, and commercially sellable website platform built for high-end photography studios, editorial campaigns, luxury destination weddings, and commercial branding commissions.

---

## 🌟 Key Highlights & Sellable Commercial Features

### 1. **Editorial Luxury Design System**
- **Obsidian & Champagne Gold Theme**: Curated dark luxury aesthetic with subtle film grain textures and high-end typography (`Playfair Display`, `Plus Jakarta Sans`, and `JetBrains Mono`).
- **Editorial Gallery Light Mode**: One-click theme switcher seamlessly transitions the studio to a high-fashion alabaster gallery view.
- **Synthesized Camera Acoustics**: Web Audio API generates authentic medium-format leaf-shutter mechanical clicks upon interaction (with a mute toggle).

### 2. **Interactive Filterable Portfolio with EXIF Telemetry**
- Filter by: *Editorial & Fashion*, *Luxury Weddings*, *Commercial & Objects*, *Architecture & Space*, and *Fine Portraiture*.
- **Full-Screen Lightbox**: Complete with EXIF telemetry inspection (*Medium Format Camera Body, Lens Optics, Exposure Triad, and Lighting Schema*), keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`), and direct *"Commission Similar Shoot"* CTA.

### 3. **Before / After Retouching & Color Grading Slider**
- Interactive comparison tool allowing prospective commercial and bridal clients to inspect uncompressed 16-bit RAW capture vs. master editorial grade.
- Highlights authentic skin frequency separation without artificial plasticization.

### 4. **Live Investment & Session Quote Calculator**
- Real-time commercial pricing engine:
  - Step 1: Select commission discipline (Editorial, Wedding, Commercial, Portraiture, Architecture).
  - Step 2: Choose duration scope (Half-Day, Full-Day, Multi-Day Destination).
  - Step 3: Configure bespoke add-ons (Aerial Drone 4K, Associate Second Photographer, 48-Hour Rush Delivery, Handcrafted Italian Archival Album, Hair/Stylist).
  - Step 4: Toggle Worldwide Commercial Advertising Buyout rights (+35%).
- Live calculation of total investment, required 30% retainer deposit, turnaround timeline, and deliverables count.
- One-click **"Lock In Quote & Reserve Date"** pre-fills the consultation modal with the selected options and pricing.

### 5. **VIP Client Proofing & Vault Portal**
- Private gallery simulation accessible via an encrypted access PIN (**Demo PIN: `2026`**).
- Features client photo selection, hearting/favorite counts, studio watermark overlay toggle, and simulated batch ZIP archive download.

### 6. **Multi-Step Commission Booking Modal & Calendar Hold**
- Captures client contact, shoot discipline, preferred dates, studio location preference (Tribeca NYC, Mayfair London, or On-Location), and creative moodboard briefs.
- Generates instant client confirmation feedback.

---

## 🚀 Getting Started

The platform is designed with zero external runtime dependencies:

```bash
# Start the local development server (Node.js native HTTP)
node server.js
```

Open your browser to:
```
http://localhost:3000
```

Alternatively, open `index.html` directly in any modern web browser.

---

## 📁 Project Structure

```
├── index.html                  # Core landing page & modal structures
├── server.js                   # Zero-dependency local development server
├── assets/
│   └── images/
│       ├── hero-editorial.jpg  # Signature high-fashion medium format visual
│       ├── retouch-after.jpg   # Master editorial retouch & color grade
│       ├── retouch-before.jpg  # 16-bit uncompressed RAW sensor capture
│       └── studio-space.jpg    # Tribeca daylight cyclorama loft space
├── styles/
│   ├── main.css                # Design system tokens, typography, hero, navigation
│   └── components.css          # Lightbox, retouch slider, calculator, VIP vault, pricing
└── scripts/
    ├── main.js                 # Theme toggle, audio FX, booking modal, toasts
    ├── portfolio.js            # Filterable portfolio & EXIF lightbox
    ├── retouch-slider.js       # Interactive before/after split slider
    ├── calculator.js           # Dynamic investment & session quote engine
    └── client-portal.js        # VIP Client proofing portal simulation
```

---

## 💼 Turnkey Commercial Viability
- **Direct Client Bookings**: Ready for active photography businesses and studio rentals.
- **Turnkey Digital Product**: Can be packaged and sold as a premium template on ThemeForest, Creative Market, or as a custom client delivery for creative agencies.
- **Deploy Anywhere**: 100% compatible with GitHub Pages, Vercel, Netlify, Cloudflare Pages, or AWS S3.

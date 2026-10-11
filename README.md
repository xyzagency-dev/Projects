# Projects — Photo Studio Platform

This branch (`photo-studio`) contains the **LUMEN & CO. | Fine Art & Commercial Photography Studio** web application, located in the [`Photo studio/`](./Photo%20studio) subdirectory.

---

## 📁 Repository Organization

```
├── Photo studio/               # Complete turnkey photography studio platform
│   ├── index.html              # Main application markup & modal dialogs
│   ├── assets/                 # High-resolution local studio & editorial imagery
│   │   └── images/
│   │       ├── hero-editorial.jpg
│   │       ├── retouch-after.jpg
│   │       ├── retouch-before.jpg
│   │       └── studio-space.jpg
│   ├── styles/
│   │   ├── main.css            # Luxury design system tokens, themes, typography
│   │   └── components.css      # Lightbox, retouch slider, calculator, VIP vault
│   ├── scripts/
│   │   ├── main.js             # Theme controller, Web Audio shutter acoustics, toasts
│   │   ├── portfolio.js        # Filterable portfolio & EXIF telemetry lightbox
│   │   ├── retouch-slider.js   # Dual-layer interactive Before/After comparison
│   │   ├── calculator.js       # Real-time session investment & quote engine
│   │   └── client-portal.js    # VIP Client proofing vault (Demo PIN: 2026)
│   ├── server.js               # Standalone server for the subdirectory
│   └── README.md               # Detailed feature & commercial specification
├── server.js                   # Root local development server
├── .gitignore
└── README.md
```

---

## 🚀 Running Locally

From either the root directory or inside `Photo studio/`:

```bash
node server.js
```

Open your browser to:
```
http://localhost:3000
```

---

## 🌟 Key Features

1. **Editorial Luxury Design**: Obsidian Dark and Editorial Gallery Light modes with authentic synthesized Hasselblad leaf-shutter acoustics (Web Audio API).
2. **Filterable Portfolio & EXIF Lightbox**: Full telemetry on medium format cameras, lenses, aperture, shutter speed, and lighting schemas.
3. **Interactive Before/After Retouch Slider**: Demonstrating uncompressed 16-bit RAW vs. master frequency separation retouching.
4. **Live Investment & Quote Calculator**: Real-time commission estimates with add-ons and commercial buyout licensing.
5. **VIP Client Proofing Vault**: Encrypted PIN authentication (**Demo PIN: `2026`**) with proof favoriting and ZIP batch packaging.
6. **Turnkey Booking Engine**: Multi-step commission reservation modal with calendar invite hold.

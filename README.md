# Projects — Interior Design Studio Platform

This branch (`interior-design`) contains the **ATELIER AURA | Luxury Interior Architecture & Turnkey Construction** web application, located in the [`Interior design/`](./Interior%20design) subdirectory.

---

## 📁 Repository Organization

```
├── Interior design/            # Complete turnkey interior architecture platform
│   ├── index.html              # Main application markup & interactive systems
│   ├── assets/                 # High-resolution architectural photography
│   │   └── images/
│   │       ├── hero-penthouse.jpg
│   │       ├── villa-architecture.jpg
│   │       ├── bespoke-kitchen.jpg
│   │       ├── luxury-bath.jpg
│   │       ├── renovation-before.jpg
│   │       ├── renovation-after.jpg
│   │       └── material-*.jpg
│   ├── css/
│   │   ├── main.css            # Luxury design system tokens, typography
│   │   └── components.css      # Calculator, before/after slider, portal, modals
│   ├── js/
│   │   └── app.js              # Reactive state engine (Calculator, Quiz, Lightbox)
│   ├── data/
│   │   └── projects.json       # Editorial case studies database
│   ├── netlify.toml            # Netlify deployment configuration for subdirectory
│   ├── _redirects              # SPA fallback routing rule
│   ├── server.js               # Standalone server for the subdirectory
│   └── README.md               # Detailed feature & commercial specification
├── server.js                   # Root development server serving "Interior design/"
├── netlify.toml                # Root Netlify configuration pointing to "Interior design/"
├── .gitignore
└── README.md
```

---

## 🚀 Running Locally

From either the root directory or inside `Interior design/`:

```bash
node server.js
```

Open your browser to:
```
http://localhost:3000
```

---

## ☁️ Netlify Deployment

This repository is pre-configured for instant zero-configuration deployment to Netlify:

- **Branch to deploy**: `interior-design`
- **Base directory**: `Interior design` (or leave blank; `netlify.toml` handles it automatically)
- **Publish directory**: `.` (or `Interior design`)
- **Build command**: *(none required, pure high-performance static delivery)*

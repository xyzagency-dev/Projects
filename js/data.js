/**
 * Vanguard & Stone - Data Store
 * Architecture, Construction & Luxury Real Estate
 * Designed for headless CMS / API readiness & easy client customization.
 */

const COMPANY_INFO = {
  name: "Vanguard & Stone",
  tagline: "Precision Engineering. Timeless Residences.",
  phone: "+1 (800) 849-2863",
  email: "concierge@vanguardstone.com",
  offices: [
    { city: "Beverly Hills", address: "9450 Wilshire Blvd, Suite 800" },
    { city: "New York", address: "540 Madison Ave, 22nd Floor" },
    { city: "Miami", address: "1111 Brickell Bay Dr, Penthouse 4" },
    { city: "Aspen", address: "420 E Hyman Ave, Suite 300" }
  ],
  stats: {
    portfolioValue: "$1.85B+",
    projectsCompleted: "340+",
    masterBuilders: "45+",
    awardsWon: "28"
  }
};

const PROPERTIES_DATA = [
  {
    id: "prop-01",
    title: "The Bel Air Monolith Estate",
    category: "villa",
    status: "For Sale",
    badge: "Exclusive",
    price: 34500000,
    priceFormatted: "$34,500,000",
    location: "Bel Air, Los Angeles, CA",
    beds: 7,
    baths: 9,
    sqft: 14200,
    yearBuilt: 2024,
    featured: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An architectural tour de force perched on a private ridge in Bel Air. Cast-in-place board-formed concrete, sweeping cantilevered balconies, 100ft infinity pool, wellness sanctuary, and panoramic views from downtown LA to the Pacific Ocean.",
    features: ["Infinity Pool & Spa", "12-Car Gallery Garage", "Wine Cellar (1,500 bottles)", "Private Helipad", "Home Theater (Dolby Atmos)", "Solar-Zero Energy System"],
    architect: "Vanguard Studio & Olson Kundig Associate",
    constructionType: "Ultra-Prestige Concrete & Glass"
  },
  {
    id: "prop-02",
    title: "The Tribeca Glass Sky-Villa",
    category: "penthouse",
    status: "For Sale",
    badge: "New Release",
    price: 22800000,
    priceFormatted: "$22,800,000",
    location: "Tribeca, New York, NY",
    beds: 5,
    baths: 6,
    sqft: 8100,
    yearBuilt: 2023,
    featured: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Triplex crown penthouse featuring 30-foot double-height ceilings, private elevator entrance, wrapped wraparound terrace with private rooftop plunge pool overlooking Hudson River sunsets.",
    features: ["Private Rooftop Plunge Pool", "Dual Wood-Burning Fireplaces", "Custom Boffi Kitchen", "Direct Keyed Elevator", "24/7 Concierge & Valet"],
    architect: "Vanguard Residential Design",
    constructionType: "Steel Frame & Acoustically Insulated Curtain Wall"
  },
  {
    id: "prop-03",
    title: "Villa Solstice Waterfront",
    category: "waterfront",
    status: "Pending",
    badge: "Under Contract",
    price: 19750000,
    priceFormatted: "$19,750,000",
    location: "Palm Island, Miami Beach, FL",
    beds: 6,
    baths: 7.5,
    sqft: 9850,
    yearBuilt: 2024,
    featured: true,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Modern organic sanctuary with 110 feet of deep water frontage. Private superyacht dock, cascading water walls, outdoor summer kitchen, Italian terrazzo floors, and hurricane-resilient structural glass.",
    features: ["110ft Yacht Dock", "Cascading Water Wall", "Outdoor Teppanyaki Kitchen", "Sub-Zero Master Suite", "Smart Home Automation"],
    architect: "SAOTA & Vanguard Engineering",
    constructionType: "Marine-Grade Post-Tensioned Concrete"
  },
  {
    id: "prop-04",
    title: "Aspen Timber Ridge Compound",
    category: "estate",
    status: "For Sale",
    badge: "Mountain Sanctuary",
    price: 27900000,
    priceFormatted: "$27,900,000",
    location: "Red Mountain, Aspen, CO",
    beds: 6,
    baths: 8,
    sqft: 11400,
    yearBuilt: 2023,
    featured: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Ski-in/ski-out timber and hand-cut stone sanctuary. Features heated driveways, radiant heated Swiss cedar terraces, indoor lap pool, oxygen-enriched master suite, and custom wine vault.",
    features: ["Ski-In / Ski-Out Access", "Oxygenation System", "Heated Motor Court", "Indoor 25m Lap Pool", "Geothermal Heating"],
    architect: "Vanguard Alpine Architecture",
    constructionType: "Cross-Laminated Timber (CLT) & Fieldstone"
  },
  {
    id: "prop-05",
    title: "The Pavilion at Paradise Valley",
    category: "villa",
    status: "For Sale",
    badge: "Architectural Icon",
    price: 15400000,
    priceFormatted: "$15,400,000",
    location: "Paradise Valley, Phoenix, AZ",
    beds: 5,
    baths: 6,
    sqft: 8600,
    yearBuilt: 2024,
    featured: false,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Desert modernism at its finest with rammed earth walls, oxidized steel louvers, and shaded desert courtyards centered around reflecting pools with Camelback Mountain vistas.",
    features: ["Rammed Earth Thermal Mass", "Reflecting Courtyards", "Desert Botanical Garden", "Tesla Solar Roof", "Negative-Edge Pool"],
    architect: "Kendle Design & Vanguard Build",
    constructionType: "Stabilized Rammed Earth & Corten Steel"
  },
  {
    id: "prop-06",
    title: "Pacific Palisades Modern Compound",
    category: "estate",
    status: "Exclusive",
    badge: "Off-Market",
    price: 29500000,
    priceFormatted: "$29,500,000",
    location: "Pacific Palisades, CA",
    beds: 7,
    baths: 10,
    sqft: 13500,
    yearBuilt: 2025,
    featured: false,
    image: "https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Brand new custom construction compound on an acre promontory. Features a detached two-story guest pavilion, pickleball court, zero-edge pool, and bespoke millwork crafted in Denmark.",
    features: ["Regal Guest Pavilion", "Regulation Pickleball Court", "Subterranean Car Gallery", "Bespoke Danish Millwork"],
    architect: "Vanguard Studio Prime",
    constructionType: "Steel Cantilever & Limestone Façade"
  }
];

const CONSTRUCTION_SERVICES = [
  {
    id: "turnkey-build",
    icon: "building",
    title: "Turnkey Luxury Construction",
    subtitle: "Ground-up bespoke residential masterpieces",
    description: "From site grading and deep foundation engineering to artisanal finishing. We manage the entire build cycle with strict milestone budgets, guaranteed delivery dates, and daily client portal webcam reports.",
    points: [
      "Licensed General Contractor A+ in CA, NY, FL, CO",
      "Precision structural steel and post-tensioned engineering",
      "Dedicated On-Site Superintendent & Project Director",
      "10-Year Comprehensive Structural Warranty"
    ],
    leadTime: "14 – 22 Months"
  },
  {
    id: "architectural-design",
    icon: "compass",
    title: "Architectural & Engineering Services",
    subtitle: "Visionary forms meeting structural rigor",
    description: "In-house RIBA & AIA licensed architects collaborate with structural, geotechnical, and MEP engineers to produce buildable, code-compliant, and breathtaking architectural blueprints.",
    points: [
      "3D BIM (Building Information Modeling) & VR walkthroughs",
      "Zoning approvals, HOA variances & coastal permits",
      "Passive house thermal & acoustic engineering",
      "Custom structural envelope & curtain wall design"
    ],
    leadTime: "3 – 6 Months"
  },
  {
    id: "gut-renovation",
    icon: "hammer",
    title: "Haute Couture Gut Renovations",
    subtitle: "Transforming historic & prime properties",
    description: "Preserving irreplaceable architectural character while completely reimagining spatial layouts, MEP infrastructure, acoustic barriers, and incorporating modern ultra-luxury finishes.",
    points: [
      "Full MEP (Mechanical, Electrical, Plumbing) modernization",
      "Structural load-bearing wall removals & steel retrofitting",
      "Imported marble slab matching & custom architectural joinery",
      "Preservation compliance & landmark approvals"
    ],
    leadTime: "6 – 14 Months"
  },
  {
    id: "sustainable-tech",
    icon: "leaf",
    title: "Sustainable & Off-Grid Engineering",
    subtitle: "Net-zero energy without aesthetic compromise",
    description: "Pioneering eco-luxe engineering: geothermal HVAC, micro-grid battery storage, greywater recycling systems, and airtight thermal envelopes certified to LEED Platinum standards.",
    points: [
      "LEED Platinum & Well Platinum Certification readiness",
      "Integrated photovoltaic solar roofs & powerwalls",
      "Hospital-grade HEPA & UV air purification systems",
      "Smart micro-climate home zoning automation"
    ],
    leadTime: "Integrated into build"
  }
];

const CONSTRUCTION_PORTFOLIO = [
  {
    id: "cs-01",
    title: "The Brentwood Cantilever House",
    location: "Brentwood, Los Angeles",
    type: "Ground-Up New Build",
    area: "12,400 sq.ft",
    timeline: "18 Months",
    completionYear: "2024",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80",
    finishedImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    clientQuote: "Vanguard delivered 2 weeks ahead of our targeted schedule. The concrete finishing is museum caliber.",
    highlight: "38ft structural steel cantilever over natural ravine"
  },
  {
    id: "cs-02",
    title: "The SoHo Cast-Iron Penthouse Conversion",
    location: "Greene St, SoHo, NY",
    type: "Historic Gut Renovation",
    area: "6,800 sq.ft",
    timeline: "12 Months",
    completionYear: "2023",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    finishedImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    clientQuote: "Flawless integration of 1890s Corinthian iron columns with minimalist Italian glass and steel.",
    highlight: "Structural crane lift of 4-ton skylights across 6 storeys"
  },
  {
    id: "cs-03",
    title: "Star Island Coastal Modern Pavilion",
    location: "Star Island, Miami",
    type: "Marine Structural Build",
    area: "15,200 sq.ft",
    timeline: "21 Months",
    completionYear: "2024",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    finishedImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    clientQuote: "Surpassed Category 5 hurricane resistance standards while looking like a floating jewel box.",
    highlight: "Driven concrete pilings 65ft down to limestone bedrock"
  }
];

const TESTIMONIALS = [
  {
    quote: "Building our dream estate with Vanguard & Stone was seamless. Having both elite real estate brokerage and master construction under one roof saved us over a year of coordination headaches and millions in misaligned planning.",
    author: "Harrison Sterling",
    role: "Managing Partner, Sterling Global Capital",
    location: "Bel Air, CA",
    rating: 5
  },
  {
    quote: "The craftsmanship in our Tribeca penthouse is simply unmatched. Their structural team resolved permitting and historic landmark challenges in record time. We sold for 42% above market comps thanks to their architectural pedigree.",
    author: "Elena Rostova",
    role: "Art Collector & Tech Founder",
    location: "Tribeca, New York",
    rating: 5
  },
  {
    quote: "From acquiring the off-market waterfront parcel to handing over the smart keys to our net-zero solar mansion, Vanguard & Stone operated with the precision of a Swiss horologist.",
    author: "Marcus & Vivienne Vance",
    role: "Private Clients",
    location: "Palm Island, Miami",
    rating: 5
  }
];

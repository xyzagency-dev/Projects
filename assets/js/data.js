/**
 * NEXUS LOUNGE & ESPORTS ARENA
 * Default Mock Data & Dynamic State Store
 */

const NEXUS_DATA = {
  cafeInfo: {
    name: "NEXUS ARENA",
    tagline: "Next-Gen Battlestations • Artisan Bistro • Social Pods",
    location: "404 Cyberway, Neo-District / Downtown Metro",
    hours: "Open 24/7 (Mon-Sun)",
    contact: "+1 (800) 555-NEXUS | contact@nexusarena.gg",
    currencySymbol: "$",
    currencyCode: "USD",
    rateMultiplier: 1.0
  },

  zones: [
    {
      id: "esports-pc",
      name: "Esports PC Arena",
      badge: "RTX 4090 • 360Hz OLED",
      desc: "Tournament-grade 24-station pit with ultra-low latency optical fiber, i9-14900KS, and Secretlab Titan Evo ergonomics.",
      hourlyRate: 8,
      totalStations: 24,
      image: "assets/images/hero_gaming_lounge.jpg"
    },
    {
      id: "sim-racing",
      name: "Direct-Drive Sim Racing",
      badge: "Triple 4K • 25Nm Torque",
      desc: "Full motion telemetry cockpits with Fanatec Podium DD, hydraulic active load-cell pedals, and tactical surround haptics.",
      hourlyRate: 15,
      totalStations: 6,
      image: "assets/images/sim_racing_vr.jpg"
    },
    {
      id: "console-lounge",
      name: "VIP Console & Couch Lounge",
      badge: "PS5 Pro • 85\" 120Hz Mini-LED",
      desc: "Private plush couch pods equipped with PS5 Pro, Xbox Series X, Dolby Atmos soundbar, and retro arcade cabinets for groups.",
      hourlyRate: 20,
      totalStations: 8,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "vr-immersion",
      name: "Omni-VR Holo Pods",
      badge: "Valve Index 2 • Motion Treadmill",
      desc: "360-degree wireless freedom with Kat Walk VR treadmills, tactile sensory vests, and multiplayer co-op room-scale tracking.",
      hourlyRate: 18,
      totalStations: 4,
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "streamer-booth",
      name: "Broadcast & Streamer Suites",
      badge: "Shure SM7B • Dual PC • 4K Cam",
      desc: "Soundproofed streaming and esports casting studios with Elgato lighting, Rodecaster Pro II, and custom Twitch overlays.",
      hourlyRate: 25,
      totalStations: 3,
      image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1200&q=80"
    }
  ],

  stations: [
    // Esports PC
    { id: "PC-01", zone: "esports-pc", name: "Battlestation Alpha 1", status: "occupied", user: "Viper_99", game: "Valorant (Ranked Radiant)", remainingMin: 34, specs: "RTX 4090 24GB • i9-14900KS • 64GB DDR5 • 360Hz OLED ZOWIE" },
    { id: "PC-02", zone: "esports-pc", name: "Battlestation Alpha 2", status: "available", user: null, game: null, remainingMin: 0, specs: "RTX 4090 24GB • i9-14900KS • 64GB DDR5 • 360Hz OLED ZOWIE" },
    { id: "PC-03", zone: "esports-pc", name: "Battlestation Alpha 3", status: "occupied", user: "Kira_God", game: "Apex Legends", remainingMin: 72, specs: "RTX 4090 24GB • i9-14900KS • 64GB DDR5 • 360Hz OLED ZOWIE" },
    { id: "PC-04", zone: "esports-pc", name: "Battlestation Alpha 4", status: "reserved", user: "Team Liquid Scrim", game: "CS2 Scrimmage", remainingMin: 15, specs: "RTX 4090 24GB • i9-14900KS • 64GB DDR5 • 360Hz OLED ZOWIE" },
    { id: "PC-05", zone: "esports-pc", name: "Battlestation Beta 1", status: "available", user: null, game: null, remainingMin: 0, specs: "RTX 4080 Super • Ryzen 7 7800X3D • 32GB DDR5 • 280Hz ASUS" },
    { id: "PC-06", zone: "esports-pc", name: "Battlestation Beta 2", status: "occupied", user: "CyberGhost", game: "Cyberpunk 2077 (Max RT)", remainingMin: 110, specs: "RTX 4080 Super • Ryzen 7 7800X3D • 32GB DDR5 • 280Hz ASUS" },
    { id: "PC-07", zone: "esports-pc", name: "Battlestation Beta 3", status: "available", user: null, game: null, remainingMin: 0, specs: "RTX 4080 Super • Ryzen 7 7800X3D • 32GB DDR5 • 280Hz ASUS" },
    { id: "PC-08", zone: "esports-pc", name: "Battlestation Beta 4", status: "maintenance", user: null, game: "Driver Upgrade", remainingMin: 0, specs: "RTX 4080 Super • Scheduled Maintenance" },

    // Sim Racing
    { id: "SIM-01", zone: "sim-racing", name: "Podium Rig Nürburgring", status: "occupied", user: "ApexHunter", game: "iRacing GT3 Series", remainingMin: 45, specs: "Fanatec Podium DD2 (25Nm) • Heusinkveld Ultimate+ Pedals • Triple 4K 144Hz" },
    { id: "SIM-02", zone: "sim-racing", name: "Podium Rig Monza", status: "available", user: null, game: null, remainingMin: 0, specs: "Fanatec Podium DD2 (25Nm) • Heusinkveld Ultimate+ Pedals • Triple 4K 144Hz" },
    { id: "SIM-03", zone: "sim-racing", name: "Podium Rig Spa", status: "available", user: null, game: null, remainingMin: 0, specs: "Simucube 2 Pro • D-BOX Motion Actuators • VR Meta Quest 3" },
    { id: "SIM-04", zone: "sim-racing", name: "Podium Rig Suzuka", status: "reserved", user: "TokyoDrifter", game: "Assetto Corsa EVO", remainingMin: 20, specs: "Simucube 2 Pro • D-BOX Motion Actuators • Triple 165Hz" },

    // Console VIP
    { id: "VIP-01", zone: "console-lounge", name: "VIP Suite Shibuya", status: "occupied", user: "Squad Party (4p)", game: "EA Sports FC 26 / Tekken 8", remainingMin: 85, specs: "PS5 Pro • 85\" Sony Bravia Mini-LED 120Hz • Dolby Atmos 7.1 • DualSense Edge" },
    { id: "VIP-02", zone: "console-lounge", name: "VIP Suite Akihabara", status: "available", user: null, game: null, remainingMin: 0, specs: "Xbox Series X + PS5 Pro • Custom Recliner Couch • Switch OLED Dock" },
    { id: "VIP-03", zone: "console-lounge", name: "VIP Suite Cyberpunk", status: "available", user: null, game: null, remainingMin: 0, specs: "Dual PS5 Pro • 4x Arcade Fightsticks • Private Minibar & Mood Lighting" },

    // VR
    { id: "VR-01", zone: "vr-immersion", name: "Holo Pod 01", status: "available", user: null, game: null, remainingMin: 0, specs: "Kat Walk C2+ Omni Treadmill • Bigscreen Beyond 4K VR • bbhaptics Tactsuit X40" },
    { id: "VR-02", zone: "vr-immersion", name: "Holo Pod 02", status: "occupied", user: "NeoMatrix", game: "Half-Life: Alyx Modded", remainingMin: 50, specs: "Kat Walk C2+ Omni Treadmill • Bigscreen Beyond 4K VR • bbhaptics Tactsuit X40" },

    // Streamer
    { id: "STR-01", zone: "streamer-booth", name: "Creator Studio Red", status: "occupied", user: "LunaValkyrie", game: "Live on Twitch (12.4k viewers)", remainingMin: 180, specs: "Dual PC Streaming Rig • Shure SM7B • Elgato Key Lights 4K • Sony A7IV Cam" },
    { id: "STR-02", zone: "streamer-booth", name: "Creator Studio Blue", status: "available", user: null, game: null, remainingMin: 0, specs: "Dual PC Streaming Rig • Shure SM7B • Elgato Stream Deck XL • Soundproof Room" }
  ],

  bistroMenu: [
    {
      id: "food-1",
      category: "Signature Eats",
      name: "Cyber-Smash Double Wagyu",
      desc: "Double wagyu patties, smoked gouda, gochujang glazed bacon, black charcoal brioche bun & truffle aioli.",
      price: 14.50,
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
      calories: "820 kcal",
      isDeskDelivery: true
    },
    {
      id: "food-2",
      category: "Signature Eats",
      name: "Overclocked Truffle Parmesan Fries",
      desc: "Crispy skin-on hand-cut fries tossed with white truffle oil, shaved aged parmesan, and roasted garlic herb dip.",
      price: 8.50,
      badge: "Quick Snack",
      image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80",
      calories: "510 kcal",
      isDeskDelivery: true
    },
    {
      id: "food-3",
      category: "Signature Eats",
      name: "Neon Glazed Korean Sticky Wings",
      desc: "6pcs ultra-crispy double-fried wings glazed with sweet spicy honey-gochujang, toasted sesame & scallions.",
      price: 12.00,
      badge: "Gamer Favorite",
      image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=600&q=80",
      calories: "680 kcal",
      isDeskDelivery: true
    },
    {
      id: "food-4",
      category: "Signature Eats",
      name: "Katsu Sando Power Bowl",
      desc: "Crispy panko chicken katsu over steamed jasmine rice, edamame, pickled ginger, kewpie drizzle & furikake.",
      price: 13.50,
      badge: "High Protein",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80",
      calories: "740 kcal",
      isDeskDelivery: true
    },
    {
      id: "drink-1",
      category: "Artisan Drinks & Boba",
      name: "Quantum Blue Spark Boba",
      desc: "Butterfly pea flower tea, electric blue lychee essence, popping mango pearls & coconut cream cap.",
      price: 6.50,
      badge: "Signature",
      image: "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80",
      calories: "280 kcal",
      isDeskDelivery: true
    },
    {
      id: "drink-2",
      category: "Artisan Drinks & Boba",
      name: "Nitro Cold Brew Overdrive",
      desc: "Single-origin Ethiopian cold brew infused with nitrogen on tap, dark chocolate hints & oat milk foam.",
      price: 5.50,
      badge: "Zero Sugar",
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
      calories: "15 kcal",
      isDeskDelivery: true
    },
    {
      id: "drink-3",
      category: "Artisan Drinks & Boba",
      name: "Apex Hyperdrive Energy Mocktail",
      desc: "Guarana extract, yuzu citrus, sparkling matcha tonic, electrolytes & crushed ice glow-rim.",
      price: 7.00,
      badge: "Focus Boost",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
      calories: "95 kcal",
      isDeskDelivery: true
    },
    {
      id: "drink-4",
      category: "Artisan Drinks & Boba",
      name: "Cyberpunk Dragonfruit Iced Refresher",
      desc: "Fresh red pitaya dragonfruit puree, crushed lime, mint leaves, sparkling spring water and aloe vera cubes.",
      price: 6.00,
      badge: "Refreshing",
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80",
      calories: "140 kcal",
      isDeskDelivery: true
    }
  ],

  tournaments: [
    {
      id: "tourney-val",
      game: "Valorant Champions Clash",
      title: "5v5 Winter Invitational Arena",
      prizePool: "$5,000 Cash Pool",
      date: "Saturday, Nov 14, 2026",
      time: "2:00 PM EST",
      entryFee: "$25 / Player",
      spotsLeft: "4 / 16 Teams Open",
      status: "Registration Open",
      badge: "Premier League",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "tourney-sim",
      game: "Assetto Corsa Grand Prix",
      title: "Apex Sim-Racing Time Trial Cup",
      prizePool: "$2,500 Cash + Fanatec Gear",
      date: "Friday, Nov 20, 2026",
      time: "7:00 PM EST",
      entryFee: "$15 / Driver",
      spotsLeft: "8 / 32 Slots Left",
      status: "Registration Open",
      badge: "Motion Rigs Only",
      image: "assets/images/sim_racing_vr.jpg"
    },
    {
      id: "tourney-fgc",
      game: "Tekken 8 & SF6 Showdown",
      title: "Fight Club Tokyo Night 1v1",
      prizePool: "$1,800 Winner-Takes-All",
      date: "Sunday, Nov 29, 2026",
      time: "5:00 PM EST",
      entryFee: "$10 / Competitor",
      spotsLeft: "12 / 64 Brackets Left",
      status: "Filling Fast",
      badge: "Double Elimination",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
    }
  ],

  memberships: [
    {
      id: "tier-recruit",
      title: "Recruit Pass",
      subtitle: "Casual & Drop-In Gamers",
      price: "$29",
      billing: "per month",
      popular: false,
      hoursIncluded: "5 Hours Game Time / mo",
      features: [
        "Standard PC & Console Lounge Access",
        "Save Game Cloud Sync & Steam Cloud",
        "5% Discount on Café & Bistro Orders",
        "Access to Weekly Casual Community Nights",
        "Member-only Discord Rank"
      ]
    },
    {
      id: "tier-elite",
      title: "Elite Pro",
      subtitle: "The Most Popular Grinder Plan",
      price: "$79",
      billing: "per month",
      popular: true,
      hoursIncluded: "20 Hours Game Time / mo",
      features: [
        "Priority Battlestation Reservation (up to 48h advance)",
        "Esports 360Hz & Sim-Racing Rig Included",
        "15% Discount on All Café & Bistro Orders",
        "Free Fast-Track Entry to Monthly Tournaments",
        "Free High-Protein Energy Drink every visit",
        "Dedicated Locker & Peripheral Storage"
      ]
    },
    {
      id: "tier-godmode",
      title: "God Mode VIP",
      subtitle: "Esports Athletes & Streamers",
      price: "$149",
      billing: "per month",
      popular: false,
      hoursIncluded: "Unlimited Off-Peak + 40 Peak Hours",
      features: [
        "All-Access: Esports PCs, Sim-Racing, Omni-VR & Stream Booths",
        "25% Discount on All Food, Drinks & Merchandise",
        "Guaranteed Dedicated Rig Reservation",
        "1 Free VIP Console Pod Guest Pass per month (4-player party)",
        "Complimentary Barista Craft Drinks on tap",
        "Direct Line to Tournament Staff & Coaches"
      ]
    }
  ],

  hardwareShowcase: [
    {
      category: "Computing & GPU",
      title: "NVIDIA GeForce RTX 4090 24GB",
      stat: "4K 240+ FPS Max RT",
      detail: "Ultra-high clock speeds with DLSS 3.5 frame gen & reflex latency down to <10ms."
    },
    {
      category: "Displays",
      title: "BenQ ZOWIE & Alienware 360Hz OLED",
      stat: "0.03ms Response Time",
      detail: "Pure motion clarity with DyAc 2 technology, ultra-smooth fast-paced esport precision."
    },
    {
      category: "Peripherals",
      title: "Custom Mechanical Keyboards & Ultralight Mice",
      stat: "8,000Hz Polling Rate",
      detail: "Wooting 60HE rapid trigger hall-effect keyboards paired with Logitech G Pro X Superlight 2."
    },
    {
      category: "Audio & Comms",
      title: "Sennheiser HD 560S & Shure Studio Mics",
      stat: "Spatial Soundstage",
      detail: "Open-back reference acoustics for pinpoint enemy footsteps and zero ear fatigue."
    },
    {
      category: "Connectivity",
      title: "Dual 10Gbps Dedicated Symmetrical Fiber",
      stat: "< 3ms Ping to Major Servers",
      detail: "BGP enterprise failover routing with DDoS protection and 0 packet loss guarantee."
    },
    {
      category: "Ergonomics",
      title: "Secretlab Titan Evo & Herman Miller Embody",
      stat: "12-Hour Comfort Guarantee",
      detail: "Magnetic 4D armrests, dynamic lumbar support and cooling memory-foam magnetic head pillows."
    }
  ],

  customerReviews: [
    {
      name: "Marcus \"Valkyrie\" Chen",
      role: "Valorant Radiant Competitor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "The latency here is unreal. My ping dropped to 3ms, the 360Hz OLEDs are insane, and ordering the Wagyu smash burger directly to station PC-04 without taking off my headset is the peak lifestyle experience."
    },
    {
      name: "Sarah 'ApexSim' Jenkins",
      role: "Sim Racing Enthusiast",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "I used to save up for a direct-drive sim rig, but coming to NEXUS to race on their 25Nm Fanatec motion cockpits is way better than anything at home. Top-tier ambiance and amazing community."
    },
    {
      name: "Darius Vance",
      role: "Esports Team Manager & Caster",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "We held our regional qualifier bootcamp in their VIP Broadcast suite. The acoustic treatment, dual-PC streaming setups, and high-speed catering kept our roster performing at peak tournament level."
    }
  ]
};

// Global export for vanilla ES-compatible browsers
if (typeof window !== "undefined") {
  window.NEXUS_DATA = NEXUS_DATA;
}

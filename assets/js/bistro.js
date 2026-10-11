/**
 * NEXUS ARENA — Cyber Bistro & Desk-Delivery Ordering System
 */

const NexusBistro = {
  cart: [],
  selectedCategory: "all",
  deliveryStation: "PC-01",

  init() {
    this.renderMenu();
    this.setupCategoryFilters();
    this.loadSavedCart();
    this.renderCart();
  },

  setupCategoryFilters() {
    const tabs = document.querySelectorAll("[data-bistro-cat]");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.selectedCategory = tab.getAttribute("data-bistro-cat");
        if (window.NexusAudio) window.NexusAudio.click();
        this.renderMenu();
      });
    });
  },

  renderMenu() {
    const container = document.getElementById("bistro-menu-grid");
    if (!container) return;

    const items = NEXUS_DATA.bistroMenu.filter(item => {
      if (this.selectedCategory === "all") return true;
      if (this.selectedCategory === "eats") return item.category.includes("Eats");
      if (this.selectedCategory === "drinks") return item.category.includes("Drinks");
      return true;
    });

    const symbol = NEXUS_DATA.cafeInfo.currencySymbol;

    container.innerHTML = items.map(item => {
      const price = (item.price * NEXUS_DATA.cafeInfo.rateMultiplier).toFixed(2);
      return `
        <div class="menu-card">
          <div class="menu-thumb">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <span class="badge badge-primary" style="position: absolute; top: 12px; left: 12px; z-index: 2;">${item.badge}</span>
          </div>
          <div class="menu-content">
            <div class="menu-header-row">
              <h3 class="menu-item-title">${item.name}</h3>
              <span class="menu-item-price">${symbol}${price}</span>
            </div>
            <p class="menu-item-desc">${item.desc}</p>
            <div class="menu-card-footer">
              <span class="menu-item-cal">🔥 ${item.calories}</span>
              <button class="btn btn-outline btn-sm" onclick="NexusBistro.addToCart('${item.id}')">
                + Add To Order
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  addToCart(itemId) {
    const item = NEXUS_DATA.bistroMenu.find(i => i.id === itemId);
    if (!item) return;

    const existing = this.cart.find(c => c.id === itemId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: 1
      });
    }

    if (window.NexusAudio) window.NexusAudio.cartAdd();
    this.saveCart();
    this.renderCart();
    NexusApp.showToast(`🍔 Added ${item.name} to desk order`);
  },

  updateQty(itemId, delta) {
    const item = this.cart.find(c => c.id === itemId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      this.cart = this.cart.filter(c => c.id !== itemId);
    }

    if (window.NexusAudio) window.NexusAudio.click();
    this.saveCart();
    this.renderCart();
  },

  saveCart() {
    localStorage.setItem("nexus_cart", JSON.stringify(this.cart));
  },

  loadSavedCart() {
    const saved = localStorage.getItem("nexus_cart");
    if (saved) {
      try {
        this.cart = JSON.parse(saved);
      } catch (e) {
        this.cart = [];
      }
    }
  },

  renderCart() {
    const cartItemsContainer = document.getElementById("cart-drawer-items");
    const countBadge = document.querySelectorAll(".cart-count-badge");
    const subtotalEl = document.getElementById("cart-subtotal");
    const totalEl = document.getElementById("cart-grand-total");
    const symbol = NEXUS_DATA.cafeInfo.currencySymbol;

    const totalCount = this.cart.reduce((sum, item) => sum + item.qty, 0);
    countBadge.forEach(el => {
      el.textContent = totalCount;
      el.style.display = totalCount > 0 ? "inline-flex" : "none";
    });

    if (!cartItemsContainer) return;

    if (this.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-dim);">
          <div style="font-size: 3rem; margin-bottom: 12px; opacity: 0.5;">🎮🍔</div>
          <p style="font-weight: 600; color: var(--text-muted);">Your Desk Tray is Empty</p>
          <p style="font-size: 0.85rem;">Add handcrafted burgers, loaded fries or energy drinks to enjoy at your rig!</p>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = `${symbol}0.00`;
      if (totalEl) totalEl.textContent = `${symbol}0.00`;
      return;
    }

    let subtotal = 0;
    cartItemsContainer.innerHTML = this.cart.map(item => {
      const itemPrice = (item.price * NEXUS_DATA.cafeInfo.rateMultiplier);
      const lineTotal = (itemPrice * item.qty).toFixed(2);
      subtotal += (itemPrice * item.qty);

      return `
        <div style="display: flex; gap: 14px; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 12px; border-radius: var(--radius-sm);">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 6px; object-fit: cover;">
          <div style="flex: 1;">
            <div style="font-weight: 700; font-size: 0.9rem; color: #fff;">${item.name}</div>
            <div style="font-size: 0.8rem; color: var(--primary); font-family: var(--font-heading);">${symbol}${lineTotal}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="btn btn-outline btn-icon" style="width: 28px; height: 28px; font-size: 0.9rem;" onclick="NexusBistro.updateQty('${item.id}', -1)">-</button>
            <span style="font-weight: 700; font-size: 0.9rem; min-width: 16px; text-align: center;">${item.qty}</span>
            <button class="btn btn-outline btn-icon" style="width: 28px; height: 28px; font-size: 0.9rem;" onclick="NexusBistro.updateQty('${item.id}', 1)">+</button>
          </div>
        </div>
      `;
    }).join("");

    const tax = subtotal * 0.08;
    const grandTotal = (subtotal + tax).toFixed(2);

    if (subtotalEl) subtotalEl.textContent = `${symbol}${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `${symbol}${grandTotal}`;
  },

  checkoutOrder() {
    if (this.cart.length === 0) {
      NexusApp.showToast("Your cart is empty!");
      return;
    }

    const stationSelect = document.getElementById("cart-delivery-station");
    const stationTarget = stationSelect ? stationSelect.value : "Your Desk";

    if (window.NexusAudio) window.NexusAudio.success();

    const orderNum = "#BISTRO-" + Math.floor(100 + Math.random() * 900);
    this.cart = [];
    this.saveCart();
    this.renderCart();
    this.toggleDrawer(false);

    NexusApp.showToast(`🚀 Order ${orderNum} dispatched to ${stationTarget}! ETA: 10 mins`);
  },

  toggleDrawer(forceState) {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-drawer-overlay");
    if (!drawer || !overlay) return;

    const isActive = forceState !== undefined ? forceState : !drawer.classList.contains("active");

    if (isActive) {
      drawer.classList.add("active");
      overlay.classList.add("active");
      if (window.NexusAudio) window.NexusAudio.click();
    } else {
      drawer.classList.remove("active");
      overlay.classList.remove("active");
    }
  }
};

window.NexusBistro = NexusBistro;

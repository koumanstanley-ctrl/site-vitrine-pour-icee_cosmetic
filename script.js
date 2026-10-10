// ICEE COSMÉTIQUES — maquette de démonstration
// Les produits et prix ci-dessous sont fictifs.

const CONFIG = {
  // À configurer uniquement avec l'accord de la boutique.
  // Format : indicatif du pays + numéro, sans + ni espaces.
  whatsappNumber: "",
  storeName: "ICEE COSMÉTIQUES"
};

const products = [
  {
    id: 1,
    name: "Velvet Glow Serum",
    category: "Sérums",
    price: 8500,
    badge: "COUP DE CŒUR",
    short: "Sérum visage — produit d'exemple.",
    description: "Fiche de démonstration. Remplacez ce texte par la description officielle, les ingrédients, le mode d'utilisation et les précautions validés par la boutique.",
    art: "dropper",
    bg: "#eaded1",
    color: "linear-gradient(90deg,#572d35,#a65d66 42%,#592834)",
    ink: "#f8e8d7"
  },
  {
    id: 2,
    name: "Daily Care Cream",
    category: "Visage",
    price: 6500,
    badge: "NOUVEAU",
    short: "Crème de soin — produit d'exemple.",
    description: "Les bénéfices, ingrédients et indications ne doivent être ajoutés qu'après vérification de l'étiquette et validation par la boutique.",
    art: "jar",
    bg: "#e6d4c3",
    color: "linear-gradient(100deg,#f4e7d3,#ddc19e 55%,#b9926b)",
    ink: "#623c3a"
  },
  {
    id: 3,
    name: "Silk Body Lotion",
    category: "Corps",
    price: 7000,
    badge: "",
    short: "Lotion pour le corps — produit d'exemple.",
    description: "Produit fictif. Ajoutez ici le volume exact, la liste d'ingrédients, les conseils d'utilisation et les précautions confirmées.",
    art: "bottle",
    bg: "#e9d8d1",
    color: "linear-gradient(90deg,#6c3540,#a55c65 48%,#5a2633)",
    ink: "#fff1e6"
  },
  {
    id: 4,
    name: "Pure Touch Cleanser",
    category: "Visage",
    price: 5500,
    badge: "",
    short: "Nettoyant visage — produit d'exemple.",
    description: "Produit fictif utilisé pour illustrer le design. Remplacez son nom, prix, photos et description par des données officielles.",
    art: "tube",
    bg: "#d9e0d6",
    color: "linear-gradient(90deg,#e4d8bd,#fff4df 45%,#c7b28d)",
    ink: "#4c5c4a"
  },
  {
    id: 5,
    name: "Radiance Drop",
    category: "Sérums",
    price: 9000,
    badge: "SÉLECTION",
    short: "Sérum — produit d'exemple.",
    description: "Aucune promesse d'efficacité n'est faite dans cette maquette. Utilisez uniquement les informations officielles et vérifiées du fabricant.",
    art: "dropper",
    bg: "#ead9b8",
    color: "linear-gradient(90deg,#b47a37,#e6bf76 45%,#94602e)",
    ink: "#573722"
  },
  {
    id: 6,
    name: "Beauty Essentials Set",
    category: "Accessoires",
    price: 12000,
    badge: "COFFRET",
    short: "Coffret illustratif — produit d'exemple.",
    description: "Exemple de coffret fictif. Contenu, prix et disponibilité doivent être confirmés avant publication.",
    art: "set",
    bg: "#e3d5d1",
    color: "linear-gradient(90deg,#6c3444,#b57882 50%,#552535)",
    ink: "#fff1e6"
  }
];

const state = {
  category: "Tous",
  search: "",
  sort: "featured",
  cart: {},
  modalId: null
};

const $ = selector => document.querySelector(selector);

const money = amount =>
  new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";

// Création des illustrations cosmétiques en CSS.
function art(product) {
  let shape = "";

  if (product.art === "jar") {
    shape = `
      <div class="product-jar"
        style="background:${product.color};color:${product.ink}">
        ICEE<small>DAILY CARE</small>
      </div>`;
  } else if (product.art === "tube") {
    shape = `
      <div class="product-tube"
        style="background:${product.color};color:${product.ink}">
        ICEE<small>PURE TOUCH</small>
      </div>`;
  } else if (product.art === "dropper") {
    shape = `
      <div class="product-dropper"
        style="background:${product.color};color:${product.ink}">
        ICEE<small>SERUM</small>
      </div>`;
  } else if (product.art === "set") {
    shape = `
      <div class="product-bottle"
        style="left:23%;width:24%;height:43%;bottom:22%;
        background:${product.color};color:${product.ink}">
        I<small>CARE</small>
      </div>
      <div class="product-jar"
        style="left:43%;width:38%;bottom:22%;
        background:linear-gradient(100deg,#e4c8a6,#fff0d8);
        color:#633d40">
        ICEE
      </div>`;
  } else {
    shape = `
      <div class="product-bottle"
        style="background:${product.color};color:${product.ink}">
        ICEE<small>BODY CARE</small>
      </div>`;
  }

  return `
    <div class="product-art" style="background:${product.bg}">
      ${shape}
    </div>`;
}

// Recherche, catégories et tri.
function filteredProducts() {
  let list = products.filter(product => {
    const matchesCategory =
      state.category === "Tous" ||
      product.category === state.category;

    const query = state.search.trim().toLocaleLowerCase("fr");

    const searchableText =
      `${product.name} ${product.category} ${product.short}`
        .toLocaleLowerCase("fr");

    return matchesCategory && (!query || searchableText.includes(query));
  });

  if (state.sort === "low") {
    list.sort((a, b) => a.price - b.price);
  }

  if (state.sort === "high") {
    list.sort((a, b) => b.price - a.price);
  }

  if (state.sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }

  return list;
}

// Affichage du catalogue.
function renderProducts() {
  const list = filteredProducts();

  $("#products").innerHTML = list.map(product => `
    <article class="product-card">
      <div
        class="visual"
        data-open="${product.id}"
        role="button"
        tabindex="0"
        aria-label="Voir ${product.name}">

        ${product.badge
          ? `<span class="badge">${product.badge}</span>`
          : ""}

        ${art(product)}

        <button class="quick" data-add="${product.id}">
          Ajouter au panier +
        </button>
      </div>

      <div class="product-info">
        <p class="category">${product.category}</p>

        <div class="name-price">
          <h3 class="name" data-open="${product.id}">
            ${product.name}
          </h3>
          <span class="price">${money(product.price)}</span>
        </div>

        <p class="short">${product.short}</p>

        <button class="btn outline mobile-add" data-add="${product.id}">
          Ajouter au panier +
        </button>
      </div>
    </article>
  `).join("");

  $("#result-count").textContent =
    `${list.length} produit${list.length > 1 ? "s" : ""}`;

  $("#empty").hidden = list.length > 0;
  $("#products").hidden = list.length === 0;
}

// Notifications temporaires.
function toast(message) {
  const element = $("#toast");

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(() => {
    element.classList.remove("show");
  }, 2600);
}

// Ajouter un produit.
function add(productId) {
  const product = products.find(item => item.id === productId);

  if (!product) return;

  state.cart[productId] = (state.cart[productId] || 0) + 1;

  renderCart();
  toast(product.name + " ajouté au panier.");
}

// Produits présents dans le panier.
function cartEntries() {
  return Object.entries(state.cart)
    .map(([id, quantity]) => ({
      product: products.find(item => item.id === Number(id)),
      quantity
    }))
    .filter(item => item.product);
}

// Actualiser le panier.
function renderCart() {
  const entries = cartEntries();

  const count = entries.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const total = entries.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  $("#cart-count").textContent = count;
  $("#drawer-count").textContent = `(${count})`;

  $("#cart-empty").hidden = entries.length > 0;
  $("#cart-footer").hidden = entries.length === 0;

  $("#cart-items").innerHTML = entries.map(({ product, quantity }) => `
    <div class="cart-item">
      <div class="cart-thumb">${art(product)}</div>

      <div>
        <h3>${product.name}</h3>
        <p>${money(product.price)}</p>

        <div class="qty">
          <button
            data-qty="${product.id}"
            data-delta="-1"
            aria-label="Diminuer la quantité">−</button>

          <span>${quantity}</span>

          <button
            data-qty="${product.id}"
            data-delta="1"
            aria-label="Augmenter la quantité">+</button>
        </div>
      </div>

      <button
        class="remove"
        data-remove="${product.id}"
        aria-label="Retirer ${product.name}">×</button>
    </div>
  `).join("");

  $("#total").textContent = money(total);
}

// Ouvrir et fermer le panier.
function openCart() {
  $("#overlay").hidden = false;
  $("#drawer").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
}

function closeCart() {
  $("#drawer").classList.remove("open");
  $("#drawer").setAttribute("aria-hidden", "true");

  if ($("#modal").hidden) {
    $("#overlay").hidden = true;
    document.body.classList.remove("lock");
  }
}

// Fiche détaillée d'un produit.
function openModal(productId) {
  const product = products.find(item => item.id === Number(productId));

  if (!product) return;

  state.modalId = product.id;

  $("#modal-category").textContent = product.category.toUpperCase();
  $("#modal-title").textContent = product.name;
  $("#modal-price").textContent = money(product.price);
  $("#modal-description").textContent = product.description;
  $("#modal-art").innerHTML = art(product);

  $("#modal").hidden = false;
  $("#overlay").hidden = false;
  document.body.classList.add("lock");
}

function closeModal() {
  $("#modal").hidden = true;

  if (!$("#drawer").classList.contains("open")) {
    $("#overlay").hidden = true;
    document.body.classList.remove("lock");
  }
}

// Préparer une commande WhatsApp.
function whatsapp() {
  const entries = cartEntries();

  if (!entries.length) {
    toast("Ajoutez au moins un produit avant de commander.");
    return;
  }

  if (!/^\d{8,15}$/.test(CONFIG.whatsappNumber)) {
    toast("Démo : le numéro WhatsApp officiel reste à confirmer dans script.js.");
    return;
  }

  const total = entries.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const message = [
    `Bonjour ${CONFIG.storeName}, je souhaite demander la disponibilité de ces produits :`,
    "",
    ...entries.map(item =>
      `• ${item.product.name} x${item.quantity} — ${
        money(item.product.price * item.quantity)
      }`
    ),
    "",
    `Sous-total estimé : ${money(total)}`,
    "Merci de confirmer les disponibilités, le prix final et les frais de livraison."
  ].join("\n");

  const url =
    `https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

// Filtres par catégorie.
$("#categories").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");

  if (!button) return;

  state.category = button.dataset.category;

  document.querySelectorAll("[data-category]").forEach(item => {
    item.classList.toggle("active", item === button);
  });

  renderProducts();
});

// Actions du catalogue : ajout au panier et ouverture des fiches.
$("#products").addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");

  if (addButton) {
    event.stopPropagation();
    add(Number(addButton.dataset.add));
    return;
  }

  const openButton = event.target.closest("[data-open]");

  if (openButton) {
    openModal(openButton.dataset.open);
  }
});

// Navigation au clavier pour ouvrir une fiche produit.
$("#products").addEventListener("keydown", event => {
  if (
    (event.key === "Enter" || event.key === " ") &&
    event.target.matches("[data-open]")
  ) {
    event.preventDefault();
    openModal(event.target.dataset.open);
  }
});

// Trier les produits.
$("#sort").addEventListener("change", event => {
  state.sort = event.target.value;
  renderProducts();
});

// Afficher ou masquer la recherche.
$("#search-toggle").addEventListener("click", () => {
  $("#search-panel").hidden = !$("#search-panel").hidden;

  if (!$("#search-panel").hidden) {
    $("#search").focus();
  }
});

// Rechercher en temps réel.
$("#search").addEventListener("input", event => {
  state.search = event.target.value;
  renderProducts();
});

// Effacer la recherche.
$("#clear-search").addEventListener("click", () => {
  $("#search").value = "";
  state.search = "";
  renderProducts();
  $("#search").focus();
});

// Réinitialiser recherche, filtre et tri.
$("#reset").addEventListener("click", () => {
  state.search = "";
  state.category = "Tous";
  state.sort = "featured";

  $("#search").value = "";
  $("#sort").value = "featured";

  document.querySelectorAll("[data-category]").forEach(button => {
    button.classList.toggle("active", button.dataset.category === "Tous");
  });

  renderProducts();
});

// Commandes du panier et de la fiche produit.
$("#open-cart").addEventListener("click", openCart);
$("#close-cart").addEventListener("click", closeCart);
$("#continue").addEventListener("click", closeCart);
$("#close-modal").addEventListener("click", closeModal);

$("#overlay").addEventListener("click", () => {
  closeCart();
  closeModal();
});

// Modifier les quantités ou retirer des produits.
$("#cart-items").addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-qty]");

  if (quantityButton) {
    const id = Number(quantityButton.dataset.qty);
    const delta = Number(quantityButton.dataset.delta);
    const newQuantity = (state.cart[id] || 0) + delta;

    if (newQuantity <= 0) {
      delete state.cart[id];
    } else {
      state.cart[id] = newQuantity;
    }

    renderCart();
  }

  const removeButton = event.target.closest("[data-remove]");

  if (removeButton) {
    delete state.cart[Number(removeButton.dataset.remove)];
    renderCart();
  }
});

// Ajouter depuis la fenêtre détaillée.
$("#modal-add").addEventListener("click", () => {
  if (state.modalId !== null) {
    add(state.modalId);
  }

  closeModal();
});

// Commander sur WhatsApp.
$("#checkout").addEventListener("click", whatsapp);

// Contacter la boutique.
$("#contact").addEventListener("click", () => {
  if (!/^\d{8,15}$/.test(CONFIG.whatsappNumber)) {
    toast("Démo : le contact officiel de la boutique reste à confirmer.");
    return;
  }

  const message =
    "Bonjour ICEE COSMÉTIQUES, j'aimerais obtenir des informations sur vos produits.";

  const url =
    `https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

// Menu mobile.
$("#menu-toggle").addEventListener("click", () => {
  $("#nav").classList.toggle("open");
});

$("#nav").querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    $("#nav").classList.remove("open");
  });
});

// Fermer les fenêtres avec la touche Échap.
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    closeModal();
    $("#nav").classList.remove("open");
  }
});

// Initialisation du site.
$("#year").textContent = new Date().getFullYear();

renderProducts();
renderCart();

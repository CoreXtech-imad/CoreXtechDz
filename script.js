// =====================
// PRODUCT DATABASE
// =====================
const products = [{
        id: 1,
        name: "Gaming Headset Pro RGB",
        price: 89.99,
        category: "Headsets",
        image: "/images/headset.jpeg",
        description: "High-quality RGB gaming headset with noise cancellation and premium sound."
    },
    {
        id: 2,
        name: "Wireless Earbuds Elite",
        price: 49.99,
        category: "Earbuds",
        image: "images/headset.jpeg",
        description: "Premium sound, long battery life, and Bluetooth 5.2 connection."
    },
    {
        id: 3,
        name: "RGB Gaming Keyboard",
        price: 79.99,
        category: "Keyboards",
        image: "images/headset.jpeg",
        description: "Mechanical RGB keyboard with customizable lighting effects."
    },
    {
        id: 4,
        name: "Gaming Mouse X-Pro",
        price: 39.99,
        category: "Mouse",
        image: "https://via.placeholder.com/400x250?text=Gaming+Mouse",
        description: "High precision gaming mouse with 7 programmable buttons."
    },
    {
        id: 5,
        name: "Smart Watch DZ",
        price: 59.99,
        category: "Accessories",
        image: "https://via.placeholder.com/400x250?text=Smart+Watch",
        description: "Smart watch with fitness tracking, notifications, and stylish design."
    },
    {
        id: 6,
        name: "Powerbank 20000mAh",
        price: 29.99,
        category: "Chargers",
        image: "https://via.placeholder.com/400x250?text=Powerbank",
        description: "Fast-charging powerbank with dual USB output and LED indicator."
    }
];

// =====================
// NAVBAR (Hamburger menu toggle)
// =====================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// =====================
// FEATURED PRODUCTS (Homepage)
// =====================
const featuredContainer = document.getElementById("featured-products");

if (featuredContainer) {
    // Show first 3 products as featured
    const featured = products.slice(0, 3);
    featured.forEach(prod => {
        featuredContainer.innerHTML += `
      <div class="product">
        <img src="${prod.image}" alt="${prod.name}">
        <div class="product-info">
          <h3>${prod.name}</h3>
          <span class="price">DA${prod.price}</span>
        </div>
        <a href="product.html?id=${prod.id}" class="buy-btn">View Details</a>
      </div>
    `;
    });
}

// =====================
// SHOP PAGE (All products + search/filter)
// =====================
const shopContainer = document.getElementById("shop-products");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function renderProducts(list) {
    if (!shopContainer) return;
    shopContainer.innerHTML = "";
    if (list.length === 0) {
        shopContainer.innerHTML = "<p>No products found.</p>";
        return;
    }
    list.forEach(prod => {
        shopContainer.innerHTML += `
      <div class="product">
        <img src="${prod.image}" alt="${prod.name}">
        <div class="product-info">
          <h3>${prod.name}</h3>
          <span class="price">$${prod.price}</span>
        </div>
        <a href="product.html?id=${prod.id}" class="buy-btn">View Details</a>
      </div>
    `;
    });
}

// Initial render
if (shopContainer) {
    renderProducts(products);
}

// Search + filter logic
if (searchInput && categoryFilter) {
    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);

    function filterProducts() {
        let searchText = searchInput.value.toLowerCase();
        let category = categoryFilter.value;

        let filtered = products.filter(p => {
            let matchesSearch = p.name.toLowerCase().includes(searchText);
            let matchesCategory = category === "all" || p.category === category;
            return matchesSearch && matchesCategory;
        });

        renderProducts(filtered);
    }
}

// =====================
// PRODUCT DETAILS PAGE
// =====================
const productDetailContainer = document.getElementById("product-detail");

if (productDetailContainer) {
    // Get ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id"));

    const product = products.find(p => p.id === productId);

    if (product) {
        productDetailContainer.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-detail-info">
        <h1>${product.name}</h1>
        <span class="price">$${product.price}</span>
        <p>${product.description}</p>
        <a href="shop.html" class="btn">⬅ Back to Shop</a>
        <a href="#" class="btn">Buy Now</a>
      </div>
    `;
    } else {
        productDetailContainer.innerHTML = "<p>Product not found.</p>";
    }
}
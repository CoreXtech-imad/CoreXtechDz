document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const product = products[id];

    if (!product) return;

    // --- Product Details ---
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("new-price").textContent = `${product.price} DA`;
    document.getElementById("old-price").textContent = `${product.oldPrice} DA`;
    document.getElementById("stock").textContent = `Stock: ${product.stock}`;

    // Features
    const featuresList = document.getElementById("product-features");
    featuresList.innerHTML = product.features.map(f => `<li>${f}</li>`).join("");

    // --- Product Images (keep from your first script) ---
    const slides = document.getElementById("product-slides");
    if (slides && product.images && product.images.length > 0) {
        slides.innerHTML = product.images
            .map(img => `<div class="swiper-slide"><img src="${img}" alt="${product.name}"></div>`)
            .join("");

        // Init Swiper only if included
        if (typeof Swiper !== "undefined") {
            new Swiper(".mySwiper", {
                loop: true,
                pagination: { el: ".swiper-pagination", clickable: true },
                navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            });
        }
    }

    // --- Pricing & Delivery ---
    const basePrice = product.price || 0;
    const totalPriceEl = document.getElementById("total-price");
    const quantityEl = document.getElementById("quantity");
    const deliveryMethodEl = document.getElementById("deliveryMethod");
    const wilayaWrapper = document.getElementById("wilaya-wrapper");
    const wilayaEl = document.getElementById("wilaya");

    function calculateTotal() {
        let qty = parseInt(quantityEl.value) || 1;
        let deliveryFee = 0;

        const method = deliveryMethodEl.value;
        const wilaya = wilayaEl.value;

        if (method === "domicile") {
            wilayaWrapper.style.display = "block";
            if (wilaya === "Alger") {
                deliveryFee = 500;
            } else if (wilaya && wilaya !== "") {
                deliveryFee = 800;
            }
        } else if (method === "bureau") {
            wilayaWrapper.style.display = "none";
            deliveryFee = 500;
        } else {
            wilayaWrapper.style.display = "none";
        }

        const total = (basePrice * qty) + deliveryFee;
        totalPriceEl.textContent = total.toFixed(2) + " DA";
    }

    quantityEl.addEventListener("input", calculateTotal);
    deliveryMethodEl.addEventListener("change", calculateTotal);
    wilayaEl.addEventListener("change", calculateTotal);
    calculateTotal();

    // --- Order Form Submission (SheetDB ready) ---
    document.getElementById("orderForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const apiURL = "https://sheetdb.io/api/v1/l00jco8jl40im"; // <-- replace with your API

        const order = {
            timestamp: new Date().toLocaleString(),
            product: product.name,
            fullname: this.fullname.value,
            phone: this.phone.value,
            address: this.address.value,
            deliveryMethod: deliveryMethodEl.value,
            wilaya: deliveryMethodEl.value === "domicile" ? wilayaEl.value : "N/A",
            quantity: quantityEl.value,
            total: totalPriceEl.textContent,
        };

        fetch(apiURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: [order] }),
            })
            .then(res => res.json())
            .then(() => {
                alert("✅ Order saved successfully!");
                this.reset();
                calculateTotal();
            })
            .catch(err => alert("❌ Error saving order: " + err.message));
    });
});
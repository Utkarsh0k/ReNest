/* ==========================================
   ReNest Marketplace
========================================== */

// ==========================================
// Sample Products (Loaded Only Once)
// ==========================================

const sampleProducts = [

    {
        id: 1,
        title: "Engineering Mathematics Book",
        description: "Almost new AKTU Mathematics book. No markings.",
        category: "Books",
        price: 450,
        seller: "Rahul",
        image: "assets/images/products/book.jpg"
    },

    {
        id: 2,
        title: "HP Scientific Calculator",
        description: "Perfect condition. Ideal for engineering students.",
        category: "Electronics",
        price: 700,
        seller: "Priya",
        image: "assets/images/products/calculator.jpg"
    },

    {
        id: 3,
        title: "Study Chair",
        description: "Comfortable chair with adjustable height.",
        category: "Furniture",
        price: 1200,
        seller: "Aman",
        image: "assets/images/products/chair.jpg"
    },

    {
        id: 4,
        title: "Mountain Bicycle",
        description: "Well maintained bicycle. Used for one semester.",
        category: "Cycles",
        price: 3800,
        seller: "Rohit",
        image: "assets/images/products/cycle.jpg"
    },

    {
        id: 5,
        title: "Laptop Backpack",
        description: "Water resistant backpack with laptop compartment.",
        category: "Accessories",
        price: 650,
        seller: "Sneha",
        image: "assets/images/products/bag.jpg"
    }

];

// ==========================================
// Initialize Products
// ==========================================

if (!localStorage.getItem("products")) {

    localStorage.setItem(

        "products",

        JSON.stringify(sampleProducts)

    );

}

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// ==========================================
// Render Products
// ==========================================

function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {

        productContainer.innerHTML = `

            <div class="empty-state">

                <h2>No Products Found</h2>

                <p>Try another search or category.</p>

            </div>

        `;

        return;

    }

    productList.forEach(product => {

        productContainer.innerHTML += `

            <div class="product-card">

                <img
                    src="${product.image || "assets/images/no-image.png"}"
                    alt="${product.title}"
                >

                <div class="card-body">

                    <span class="card-category">

                        ${product.category}

                    </span>

                    <h3 class="card-title">

                        ${product.title}

                    </h3>

                    <p>

                        ${product.description
                            ? product.description.substring(0,60) + "..."
                            : "No description available."}

                    </p>

                    <p class="card-price">

                        ₹${product.price}

                    </p>

                    <p class="card-seller">

                        Seller: ${product.seller}

                    </p>

                    <div class="card-actions">

                        <button
                            class="view-btn"
                            onclick="viewProduct(${product.id})">

                            View Details

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}

// ==========================================
// Search & Filter
// ==========================================

function filterProducts() {

    const products = JSON.parse(

        localStorage.getItem("products")

    ) || [];

    const search = searchInput.value.toLowerCase().trim();

    const category = categoryFilter.value;

    const filtered = products.filter(product => {

        const matchesSearch = product.title
            .toLowerCase()
            .includes(search);

        const matchesCategory =

            category === "All"

            ||

            product.category === category;

        return matchesSearch && matchesCategory;

    });

    displayProducts(filtered);

}

// ==========================================
// View Product
// ==========================================

function viewProduct(id) {

    localStorage.setItem("selectedProduct", id);

    window.location.href = "product.html";

}

// ==========================================
// Events
// ==========================================

searchInput.addEventListener(

    "input",

    filterProducts

);

categoryFilter.addEventListener(

    "change",

    filterProducts

);

// ==========================================
// Initial Load
// ==========================================

filterProducts();
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
    image: "assets/images/products/book.jpg",
  },

  {
    id: 2,
    title: "HP Scientific Calculator",
    description: "Perfect condition. Ideal for engineering students.",
    category: "Electronics",
    price: 700,
    seller: "Priya",
    image: "assets/images/products/calculator.jpg",
  },

  {
    id: 3,
    title: "Study Chair",
    description: "Comfortable chair with adjustable height.",
    category: "Furniture",
    price: 1200,
    seller: "Aman",
    image: "assets/images/products/chair.jpg",
  },

  {
    id: 4,
    title: "Mountain Bicycle",
    description: "Well maintained bicycle. Used for one semester.",
    category: "Cycles",
    price: 3800,
    seller: "Rohit",
    image: "assets/images/products/cycle.jpg",
  },

  {
    id: 5,
    title: "Laptop Backpack",
    description: "Water resistant backpack with laptop compartment.",
    category: "Accessories",
    price: 650,
    seller: "Sneha",
    image: "assets/images/products/bag.jpg",
  },
];

// ==========================================
// Initialize Products
// ==========================================

if (!localStorage.getItem("products")) {
  localStorage.setItem(
    "products",

    JSON.stringify(sampleProducts),
  );
}

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");

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

  productList.forEach((product) => {
    productContainer.innerHTML += `

    <div class="product-card">

        <div class="card-image">

            <img
                src="${product.image || "assets/images/no-image.png"}"
                alt="${product.title}"
            >

            <span class="condition-badge">

                ${product.condition || "Used"}

            </span>

        </div>

        <div class="card-body">

            <span class="card-category">

                ${product.category}

            </span>

            <h3 class="card-title">

                ${product.title}

            </h3>

           

            <p class="card-price">

                ${formatPrice(product.price)}

            </p>

            <div class="card-bottom">

    <span class="seller-name">

        ${product.seller}

    </span>

    <button

        class="view-btn"

        onclick="viewProduct(${product.id})">

        View →

    </button>

</div>

            <button
                class="primary"
                onclick="viewProduct(${product.id})">

                View Details

            </button>

        </div>

    </div>

    `;
  });
}

// ==========================================
// Search & Filter
// ==========================================

function filterProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  const search = searchInput.value.toLowerCase().trim();

  const filtered = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search);

    return matchesSearch;
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

  filterProducts,
);



// ==========================================
// Initial Load
// ==========================================

filterProducts();

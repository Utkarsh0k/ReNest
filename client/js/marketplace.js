/* ==========================================
   ReNest Marketplace
========================================== */

// ==========================================
// Initialize Products
// ==========================================

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const pills = document.querySelectorAll(".pill");
const sortSelect = document.getElementById("sortSelect");

let currentCategory = "All";
let allProducts = [];
// ==========================================
// Render Products
// ==========================================
async function loadProducts() {
  try {
    const response = await fetch("http://localhost:5000/api/products");

    allProducts = await response.json();

    filterProducts();
  } catch (err) {
    console.error(err);

    showToast("Unable to load marketplace.", "error");
  }
}
function displayProducts(productList) {
  productContainer.innerHTML = "";
  document.getElementById("listingCount").textContent =
    `${productList.length} Product${productList.length !== 1 ? "s" : ""}`;
  const count = document.getElementById("listingCount");

  if (count) {
    count.textContent = `${productList.length} Product${productList.length !== 1 ? "s" : ""}`;
  }
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

            <span class="condition-badge ${product.condition.toLowerCase().replace(/\s/g, "-")}">

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
            <p class="card-seller">

    Sold by

    ${product.seller?.name || "Unknown"}

</p>

            

           <button
    class="primary"
    onclick="viewProduct('${product._id}')">

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
  let products = [...allProducts];

  const search = searchInput.value.toLowerCase().trim();

  products = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search);

    const matchesCategory =
      currentCategory === "All" || product.category === currentCategory;

    return matchesSearch && matchesCategory;
  });

  switch (sortSelect.value) {
    case "low":
      products.sort((a, b) => a.price - b.price);

      break;

    case "high":
      products.sort((a, b) => b.price - a.price);

      break;

    default:
      products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  displayProducts(products);
}

// ==========================================
// View Product
// ==========================================

function viewProduct(productId) {
  window.location.href = `product.html?id=${productId}`;
}

// ==========================================
// Events
// ==========================================

searchInput.addEventListener(
  "input",

  filterProducts,
);

pills.forEach((pill) => {
  pill.addEventListener("click", () => {
    pills.forEach((btn) => btn.classList.remove("active"));

    pill.classList.add("active");

    currentCategory = pill.dataset.category;

    filterProducts();
  });
});
sortSelect.addEventListener("change", filterProducts);

// ==========================================
// Initial Load
// ==========================================

loadProducts();

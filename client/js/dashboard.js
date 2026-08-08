/* ==========================================
   ReNest Dashboard
========================================== */

const API_URL = "https://renest-j8yz.onrender.com/api/products";

const container = document.getElementById("myProducts");

const totalListings = document.getElementById("totalListings");
const availableListings = document.getElementById("availableListings");
const soldListings = document.getElementById("soldListings");
const totalValue = document.getElementById("totalValue");
const welcomeTitle = document.getElementById("welcomeTitle");

document
    .getElementById("refreshBtn")
    .addEventListener("click", loadDashboard);

loadDashboard();

/* ==========================================
   LOAD DASHBOARD
========================================== */

async function loadDashboard() {

    try {

        const token = localStorage.getItem("token");

        if (!token) {

            window.location.href = "login.html";

            return;

        }

        const response = await fetch(API_URL, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const products = await response.json();

        if (!response.ok) {

            throw new Error(products.message);

        }

        const payload = parseJwt(token);

        const myProducts = products.filter(product =>

            product.seller &&
            product.seller._id === payload.id

        );

        renderStats(myProducts);

        renderProducts(myProducts);

        welcomeTitle.textContent =
            `Welcome Back, ${payload.name || "User"} 👋`;

    }

    catch (err) {

        console.error(err);

        showToast("Unable to load dashboard.", "error");

    }

}

/* ==========================================
   STATS
========================================== */

function renderStats(products) {

    totalListings.textContent = products.length;

    const available = products.filter(

        p => p.status !== "Sold"

    ).length;

    const sold = products.filter(

        p => p.status === "Sold"

    ).length;

    const value = products.reduce(

        (sum, p) => sum + p.price,

        0

    );

    availableListings.textContent = available;

    soldListings.textContent = sold;

    totalValue.textContent = formatPrice(value);

}

/* ==========================================
   PRODUCTS
========================================== */

function renderProducts(products) {

    container.innerHTML = "";

    if (products.length === 0) {

        container.innerHTML = `

        <div class="empty-message">

            <div class="empty-icon">

                📦

            </div>

            <h2>

                No Listings Yet

            </h2>

            <p>

                Start selling books,
                furniture or electronics.

            </p>

            <a
                href="sell.html"
                class="primary">

                Sell First Item

            </a>

        </div>

        `;

        return;

    }

    products.forEach(product => {

        const status = product.status || "Available";

        container.innerHTML += `

        <div class="dashboard-card">

            <img
                src="${product.image}"
                alt="${product.title}">

            <div class="dashboard-body">

                <h3>

                    ${product.title}

                </h3>

                <div class="dashboard-meta">

                    <span>

                        ${product.category}

                    </span>

                    <span class="status-pill ${status.toLowerCase()}">

                        ${status}

                    </span>

                </div>

                <div class="dashboard-price">

                    ${formatPrice(product.price)}

                </div>

                <div class="dashboard-info">

                    Posted
                    ${new Date(product.createdAt)
                        .toLocaleDateString()}

                </div>

                <div class="dashboard-actions">

                    <button
                        class="secondary"
                        onclick="viewProduct('${product._id}')">

                        View

                    </button>

                    <button
                        class="primary"
                        onclick="markSold('${product._id}')">

                        Sold

                    </button>

                    <button
                        class="secondary"
                        onclick="editProduct('${product._id}')">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct('${product._id}')">

                        Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

/* ==========================================
   ACTIONS
========================================== */

function viewProduct(id) {

    window.location.href =

        `product.html?id=${id}`;

}

function editProduct(id) {

    showToast(

        "Edit feature coming soon.",

        "info"

    );

}

async function deleteProduct(id) {

    if (!confirm("Delete this listing?")) return;

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(

            `${API_URL}/${id}`,

            {

                method: "DELETE",

                headers: {

                    Authorization:
                        `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        showToast(

            "Listing Deleted",

            "success"

        );

        loadDashboard();

    }

    catch (err) {

        showToast(err.message, "error");

    }

}

async function markSold(id) {

    showToast(

        "Coming Soon",

        "info"

    );

}

/* ==========================================
   JWT
========================================== */

function parseJwt(token) {

    return JSON.parse(

        atob(

            token.split(".")[1]

        )

    );

}
const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

if (!currentUser) {

    window.location.href = "login.html";

}

document.getElementById("userName").textContent =
    currentUser.name;

document.getElementById("userEmail").textContent =
    currentUser.email;

document.getElementById("avatarLetter").textContent =
    currentUser.name.charAt(0).toUpperCase();

const products = JSON.parse(
    localStorage.getItem("products")
) || [];

/* ==========================================
   User Statistics
========================================== */

const myProducts = products.filter(product =>

    product.sellerEmail === currentUser.email

);

const totalListings = myProducts.length;

const totalValue = myProducts.reduce(

    (sum, product) => sum + product.price,

    0

);

document.getElementById("listingCount").textContent =
    totalListings;

/* ==========================================
   Add More Stats
========================================== */

const stats = document.querySelector(".stats");

stats.innerHTML = `

    <div class="stat">

        <h3>${totalListings}</h3>

        <span>Listings</span>

    </div>

    <div class="stat">

        <h3>₹${totalValue}</h3>

        <span>Total Value</span>

    </div>

`;

/* ==========================================
   Logout
========================================== */

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        const confirmLogout = confirm(

            "Are you sure you want to logout?"

        );

        if (!confirmLogout) return;

        localStorage.removeItem("currentUser");

        showToast("Logged Out Successfully", "success");

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1000);

    });
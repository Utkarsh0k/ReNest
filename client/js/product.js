/* ==========================================
   ReNest Product Details
========================================== */

const API_URL = "https://renest-j8yz.onrender.com/api/products";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
    window.location.href = "marketplace.html";
}

loadProduct();

async function loadProduct() {

    try {

        const response = await fetch(`${API_URL}/${productId}`);

        if (!response.ok) {
            throw new Error("Product not found");
        }

        const product = await response.json();

        renderProduct(product);

    }

    catch (err) {

        console.error(err);

        showToast("Unable to load product.", "error");

        setTimeout(() => {

            window.location.href = "marketplace.html";

        }, 1200);

    }

}

function renderProduct(product) {

    document.getElementById("productImage").src =
        product.image || "assets/images/no-image.png";

    document.getElementById("productImage").alt =
        product.title;

    document.getElementById("productTitle").textContent =
        product.title;

    document.getElementById("productPrice").textContent =
        formatPrice(product.price);

    document.getElementById("productDescription").textContent =
        product.description;

    document.getElementById("productCategory").textContent =
        product.category;

    document.getElementById("specCategory").textContent =
        product.category;

    document.getElementById("specStatus").textContent =
        "Available";

    document.getElementById("sellerName").textContent =
        product.seller?.name || "Unknown Seller";

    document.getElementById("sellerEmail").textContent =
        product.seller?.email || "Not Available";

    document.getElementById("sellerStatus").textContent =
        "Available";

    document.getElementById("sellerPosted").textContent =
        new Date(product.createdAt).toLocaleDateString();

    document.getElementById("sellerAvatar").textContent =
        (product.seller?.name || "U")
            .charAt(0)
            .toUpperCase();

}
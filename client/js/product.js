const id = Number(

    localStorage.getItem("selectedProduct")

);

if (!id) {

    window.location.href = "marketplace.html";

}

const products = JSON.parse(

    localStorage.getItem("products")

) || [];

const product = products.find(

    p => p.id === id

);

if (!product) {

    window.location.href = "marketplace.html";

}

/* ==========================================
   Load Product
========================================== */

document.getElementById("productImage").src =
    product.image;

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
    product.status || "Available";
/* ==========================================
   Seller Info
========================================== */

document.getElementById("sellerName").textContent =
    product.seller;

document.getElementById("sellerEmail").textContent =
    product.sellerEmail || "Not Available";

document.getElementById("sellerStatus").textContent =
    product.status || "Available";

document.getElementById("sellerPosted").textContent =
    product.postedOn || "Recently";

document.getElementById("sellerAvatar").textContent =
    product.seller.charAt(0).toUpperCase();

/* ==========================================
   Contact Seller
========================================== */

document

.getElementById("contactBtn")

.addEventListener("click", () => {

    if (product.sellerEmail) {

        window.location.href =

            `mailto:${product.sellerEmail}?subject=Interested in ${product.title}`;

    } else {

        showToast(

            "Seller email not available.",

            "error"

        );

    }

});
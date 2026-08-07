const params = new URLSearchParams(window.location.search);

const id = params.get("id");

if (!id) {

    window.location.href = "marketplace.html";

}

loadProduct();

async function loadProduct() {

    try {

        const response = await fetch(

            `http://localhost:5000/api/products/${id}`

        );

        if (!response.ok) {

            window.location.href = "marketplace.html";

            return;

        }

        const product = await response.json();

        renderProduct(product);

    }

    catch {

        showToast(

            "Unable to load product.",

            "error"

        );

    }

}
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
    product.seller.name;

document.getElementById("sellerEmail").textContent =
    product.seller.email || "Not Available";

document.getElementById("sellerStatus").textContent =
    product.status || "Available";

document.getElementById("sellerPosted").textContent =
    product.postedOn || "Recently";

document.getElementById("sellerAvatar").textContent =
    product.seller.name.charAt(0).toUpperCase();

/* ==========================================
   Contact Seller
========================================== */

document

.getElementById("contactBtn")

.addEventListener("click", () => {

    if (product.seller.email) {

        window.location.href =

            `mailto:${product.seller.email}?subject=Interested in ${product.title}`;

    } else {

        showToast(

            "Seller email not available.",

            "error"

        );

    }

});
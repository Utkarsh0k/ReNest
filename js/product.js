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

/* ==========================================
   Seller Info
========================================== */

const sellerBox = document.querySelector(".seller-box");

sellerBox.innerHTML = `

    <h3>Seller Information</h3>

    <p>

        <strong>Name:</strong>

        ${product.seller}

    </p>

    <p>

        <strong>Email:</strong>

        ${product.sellerEmail || "Not Available"}

    </p>

    <p>

        <strong>Status:</strong>

        <span style="color:${
            product.status === "Sold"
                ? "#dc2626"
                : "#16a34a"
        }">

            ${product.status || "Available"}

        </span>

    </p>

    <p>

        <strong>Posted:</strong>

        ${product.postedOn || "Recently"}

    </p>

`;

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
const id = Number(

    localStorage.getItem("selectedProduct")

);

const products = JSON.parse(

    localStorage.getItem("products")

) || [];

const product = products.find(

    p => p.id === id

);

if(!product){

    window.location.href = "marketplace.html";

}

document.getElementById("productImage").src =
product.image;

document.getElementById("productTitle").textContent =
product.title;

document.getElementById("productPrice").textContent =
`₹${product.price}`;

document.getElementById("productDescription").textContent =
product.description;

document.getElementById("productSeller").textContent =
product.seller;

document.getElementById("productCategory").textContent =
product.category;

document
.getElementById("contactBtn")
.addEventListener("click",()=>{

    showToast(

        `Contact ${product.seller} directly.`,

        "info"

    );

});
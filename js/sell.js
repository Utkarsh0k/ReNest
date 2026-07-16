const dropArea = document.getElementById("dropArea");
const imageInput = document.getElementById("imageInput");
const browseBtn = document.getElementById("browseBtn");
const preview = document.getElementById("previewImage");
const sellForm = document.getElementById("sellForm");

let imageData = "";

/* ==========================================
   Browse Image
========================================== */

browseBtn.addEventListener("click", () => {

    imageInput.click();

});

/* ==========================================
   Image Preview
========================================== */

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (!file) return;

    loadImage(file);

});

/* ==========================================
   Drag & Drop
========================================== */

dropArea.addEventListener("dragover", (e) => {

    e.preventDefault();

    dropArea.classList.add("dragover");

});

dropArea.addEventListener("dragleave", () => {

    dropArea.classList.remove("dragover");

});

dropArea.addEventListener("drop", (e) => {

    e.preventDefault();

    dropArea.classList.remove("dragover");

    const file = e.dataTransfer.files[0];

    if (!file) return;

    loadImage(file);

});

/* ==========================================
   Load Image
========================================== */

function loadImage(file) {

    if (!file.type.startsWith("image/")) {

        showToast("Please upload an image.", "error");

        return;

    }

    const reader = new FileReader();

    reader.onload = (e) => {

        imageData = e.target.result;

        preview.src = imageData;

    };

    reader.readAsDataURL(file);

}

/* ==========================================
   Submit Form
========================================== */

sellForm.addEventListener("submit", (e) => {

    e.preventDefault();

    if (!imageData) {

        showToast("Please upload a product image.", "error");

        return;

    }

    const products = JSON.parse(localStorage.getItem("products")) || [];

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const product = {

        id: Date.now(),

        title: document.getElementById("title").value,

        description: document.getElementById("description").value,

        price: Number(document.getElementById("price").value),

        category: document.getElementById("category").value,

        image: imageData,

        seller: currentUser ? currentUser.name : "Anonymous"

    };

    products.push(product);

    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );

    showToast("Listing Published!", "success");

    sellForm.reset();

    imageData = "";

    preview.src = "assets/images/upload.png";

    setTimeout(() => {

        window.location.href = "marketplace.html";

    }, 1200);

});
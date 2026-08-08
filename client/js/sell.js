/* ==========================================
   ReNest - Sell Item
========================================== */

const API_URL = "https://renest-j8yz.onrender.com/api/products";

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
   Image Selection
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

        showToast("Please upload a valid image.", "error");

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
   Submit Product
========================================== */

sellForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = Number(document.getElementById("price").value);
    const category = document.getElementById("category").value;
    const condition = document.getElementById("condition").value;

    if (!imageData) {
        showToast("Please upload a product image.", "error");
        return;
    }

    if (title.length < 3) {
        showToast("Product title is too short.", "error");
        return;
    }

    if (description.length < 10) {
        showToast("Description should be at least 10 characters.", "error");
        return;
    }

    if (price <= 0) {
        showToast("Please enter a valid price.", "error");
        return;
    }

    if (!category) {
        showToast("Please select a category.", "error");
        return;
    }

    if (!condition) {
        showToast("Please select the item condition.", "error");
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        showToast("Please login first.", "error");
        return;
    }

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },

            body: JSON.stringify({

                title,
                description,
                price,
                category,
                condition,
                image: imageData

            })

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to list product.");
        }

        showToast("Product listed successfully!", "success");

        sellForm.reset();

        imageData = "";

        preview.src = "assets/images/upload.png";

        setTimeout(() => {

            window.location.href = "marketplace.html";

        }, 1000);

    }

    catch (err) {

        console.error(err);

        showToast(err.message, "error");

    }

});
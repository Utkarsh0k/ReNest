/**
 * =========================================
 * ReNest - Global JavaScript
 * =========================================
 */

let toastTimer;

/* ==========================================
   Toast Notification
========================================== */

function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    if (!toast) return;

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.className = "";

    toast.classList.add(type);

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

/* ==========================================
   Loading Button
========================================== */

function setButtonLoading(button, loading = true) {

    if (!button) return;

    if (loading) {

        button.dataset.originalText = button.innerHTML;

        button.disabled = true;

        button.innerHTML = "Loading...";

    }

    else {

        button.disabled = false;

        button.innerHTML = button.dataset.originalText;

    }

}

/* ==========================================
   Currency Formatter
========================================== */

function formatPrice(price) {

    return `₹${Number(price).toLocaleString("en-IN")}`;

}
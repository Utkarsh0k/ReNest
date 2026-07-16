/**
 * =========================================
 * ReNest - Global JavaScript
 * =========================================
 */

/**
 * Displays a toast notification.
 *
 * @param {string} message
 * @param {"success"|"error"|"info"} type
 */

function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.className = "";

    toast.classList.add(type);
    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}
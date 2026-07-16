const protectedPages = [

    "marketplace.html",

    "sell.html",

    "dashboard.html",

    "profile.html",

    "product.html"

];

const page = window.location.pathname.split("/").pop();

const user = JSON.parse(localStorage.getItem("currentUser"));

if (protectedPages.includes(page) && !user) {

    window.location.href = "login.html";

}
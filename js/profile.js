const currentUser = JSON.parse(

    localStorage.getItem("currentUser")

);

if(!currentUser){

    window.location.href = "login.html";

}

document.getElementById("userName").textContent =
currentUser.name;

document.getElementById("userEmail").textContent =
currentUser.email;

document.getElementById("avatarLetter").textContent =
currentUser.name.charAt(0).toUpperCase();

const products = JSON.parse(

    localStorage.getItem("products")

) || [];

const totalListings = products.filter(product =>

    product.seller === currentUser.name

).length;

document.getElementById("listingCount").textContent =
totalListings;

document
.getElementById("logoutBtn")
.addEventListener("click",()=>{

    localStorage.removeItem("currentUser");

    showToast("Logged Out","info");

    setTimeout(()=>{

        window.location.href="index.html";

    },1000);

});
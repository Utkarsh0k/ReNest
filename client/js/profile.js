/* ==========================================
   ReNest Profile
========================================== */

const API_AUTH = "https://renest-j8yz.onrender.com/api/auth";
const API_PRODUCTS = "https://renest-j8yz.onrender.com/api/products";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

loadProfile();

document
    .getElementById("editProfileBtn")
    .addEventListener("click", () => {

        document
            .getElementById("profileModal")
            .classList.remove("hidden");

    });

document
    .getElementById("cancelEdit")
    .addEventListener("click", () => {

        document
            .getElementById("profileModal")
            .classList.add("hidden");

    });

document
    .getElementById("saveProfile")
    .addEventListener("click", saveProfile);

document
    .getElementById("logoutBtn")
    .addEventListener("click", logout);

/* ==========================================
   LOAD PROFILE
========================================== */

async function loadProfile() {

    try {

        const response = await fetch(

            `${API_AUTH}/profile`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const user = await response.json();

        if (!response.ok) {

            throw new Error(user.message);

        }

        renderUser(user);

        loadProducts(user);

    }

    catch (err) {

        console.error(err);

        showToast(err.message, "error");

    }

}

/* ==========================================
   USER
========================================== */

function renderUser(user) {

    document.getElementById("userName").textContent =
        user.name;

    document.getElementById("userEmail").textContent =
        user.email;

    document.getElementById("userCollege").textContent =
        user.college || "-";

    document.getElementById("userBranch").textContent =
        user.branch || "-";

    document.getElementById("userYear").textContent =
        user.year || "-";

    document.getElementById("userPhone").textContent =
        user.phone || "-";

    document.getElementById("userBio").textContent =
        user.bio || "No bio added yet.";

    document.getElementById("collegeBranch").textContent =
        `${user.branch || ""} ${user.year || ""}`;

    document.getElementById("joinedDate").textContent =
        `Member Since ${new Date(user.createdAt).toLocaleDateString()}`;

    if (user.profileImage) {

        document.getElementById("profileImage").src =
            user.profileImage;

        document
            .getElementById("avatarFallback")
            .style.display = "none";

    }

    else {

        document
            .getElementById("avatarFallback")
            .textContent =
            user.name.charAt(0).toUpperCase();

    }

    document.getElementById("editCollege").value =
        user.college || "";

    document.getElementById("editBranch").value =
        user.branch || "";

    document.getElementById("editYear").value =
        user.year || "";

    document.getElementById("editPhone").value =
        user.phone || "";

    document.getElementById("editBio").value =
        user.bio || "";

    document.getElementById("editImage").value =
        user.profileImage || "";

}

/* ==========================================
   PRODUCTS
========================================== */

async function loadProducts(user) {

    const response = await fetch(

        API_PRODUCTS,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    const products = await response.json();

    const mine = products.filter(

        p => p.seller &&
             p.seller._id === user._id

    );

    document.getElementById("listingCount").textContent =
        mine.length;

    document.getElementById("availableCount").textContent =
        mine.filter(

            p => p.status !== "Sold"

        ).length;

    document.getElementById("soldCount").textContent =
        mine.filter(

            p => p.status === "Sold"

        ).length;

    const value = mine.reduce(

        (sum, p) => sum + p.price,

        0

    );

    document.getElementById("totalValue").textContent =
        formatPrice(value);

    const recent =
        document.getElementById("recentListings");

    recent.innerHTML = "";

    if (mine.length === 0) {

        recent.innerHTML = `

        <p>No Listings Yet</p>

        `;

        return;

    }

    mine.slice(0,3).forEach(product=>{

        recent.innerHTML+=`

        <div class="listing">

            <img
                src="${product.image}"
                alt="${product.title}">

            <div>

                <h4>

                    ${product.title}

                </h4>

                <div class="listing-price">

                    ${formatPrice(product.price)}

                </div>

            </div>

        </div>

        `;

    });

}

/* ==========================================
   SAVE PROFILE
========================================== */

async function saveProfile(){

    try{

        const body={

            college:
            document.getElementById("editCollege").value,

            branch:
            document.getElementById("editBranch").value,

            year:
            document.getElementById("editYear").value,

            phone:
            document.getElementById("editPhone").value,

            bio:
            document.getElementById("editBio").value,

            profileImage:
            document.getElementById("editImage").value

        };

        const response=await fetch(

            `${API_AUTH}/profile`,

            {

                method:"PUT",

                headers:{

                    "Content-Type":"application/json",

                    Authorization:`Bearer ${token}`

                },

                body:JSON.stringify(body)

            }

        );

        const data=await response.json();

        if(!response.ok){

            throw new Error(data.message);

        }

        showToast(

            "Profile Updated",

            "success"

        );

        document
        .getElementById("profileModal")
        .classList.add("hidden");

        loadProfile();

    }

    catch(err){

        showToast(

            err.message,

            "error"

        );

    }

}

/* ==========================================
   LOGOUT
========================================== */

function logout(){

    if(!confirm("Logout?")) return;

    localStorage.removeItem("token");

    showToast(

        "Logged Out",

        "success"

    );

    setTimeout(()=>{

        window.location.href="index.html";

    },800);

}
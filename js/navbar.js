async function loadNavbar() {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    try {

        const response = await fetch("components/navbar.html");

        navbar.innerHTML = await response.text();

    } catch {

        console.error("Unable to load navbar.");

        return;

    }

    const currentUser = JSON.parse(

        localStorage.getItem("currentUser")

    );

    const authNav = document.getElementById("authNav");

    if (!authNav) return;

    /* ==========================================
       Active Page
    ========================================== */

    const currentPage = window.location.pathname
        .split("/")
        .pop();

    document.querySelectorAll("nav a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.classList.add("active-nav");

        }

    });

    /* ==========================================
       Hide Protected Pages
    ========================================== */

    if (!currentUser) {

        ["sell.html", "dashboard.html", "profile.html"]

        .forEach(page => {

            const link = document.querySelector(

                `nav a[href="${page}"]`

            );

            if (link) {

                link.parentElement.style.display = "none";

            }

        });

        authNav.innerHTML = `

            <a href="login.html" class="login-btn">

                Login

            </a>

        `;

        return;

    }

    /* ==========================================
       Logged In
    ========================================== */

    authNav.innerHTML = `

        <span class="nav-user">

            👋 Hi, ${currentUser.name}

        </span>

        <button

            id="logoutNavBtn"

            class="nav-logout"

        >

            Logout

        </button>

    `;

    document

        .getElementById("logoutNavBtn")

        .addEventListener("click", () => {

            localStorage.removeItem(

                "currentUser"

            );

            showToast(

                "Logged Out Successfully",

                "success"

            );

            setTimeout(() => {

                window.location.href =

                    "index.html";

            }, 800);

        });

}

document.addEventListener(

    "DOMContentLoaded",

    loadNavbar

);
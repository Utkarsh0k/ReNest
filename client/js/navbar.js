/* ==========================================
   ReNest Navbar
========================================== */

const navbarContainer = document.getElementById("navbar");

if (navbarContainer) {
    loadNavbar();
}

async function loadNavbar() {

    try {

        const response = await fetch("components/navbar.html");

        if (!response.ok) {
            throw new Error("Unable to load navbar");
        }

        navbarContainer.innerHTML = await response.text();

        setupNavbar();

    } catch (error) {

        console.error("Navbar Error:", error);

    }

}


/* ==========================================
   NAVBAR SETUP
========================================== */

function setupNavbar() {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (!menuToggle || !navMenu) {
        return;
    }


    /* ==========================================
       MOBILE MENU
    ========================================== */

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    /* ==========================================
       CLOSE MENU WHEN LINK IS CLICKED
    ========================================== */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMobileMenu();

        });

    });


    /* ==========================================
       CLOSE WITH ESCAPE
    ========================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    });


    /* ==========================================
       CLOSE WHEN CLICKING OUTSIDE
    ========================================== */

    document.addEventListener("click", event => {

        if (
            navMenu.classList.contains("open") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            closeMobileMenu();

        }

    });


    /* ==========================================
       AUTH UI
    ========================================== */

    setupAuthUI();

}


/* ==========================================
   CLOSE MOBILE MENU
========================================== */

function closeMobileMenu() {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (!menuToggle || !navMenu) {
        return;
    }

    navMenu.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove("menu-open");

}


/* ==========================================
   AUTH UI
========================================== */

function setupAuthUI() {

    const authNav = document.getElementById("authNav");

    if (!authNav) {
        return;
    }

    const token = localStorage.getItem("token");

    const currentUser =
        localStorage.getItem("currentUser");

    let user = null;

    try {

        user = currentUser
            ? JSON.parse(currentUser)
            : null;

    } catch {

        user = null;

    }


    /* ==========================================
       LOGGED IN
    ========================================== */

    if (token) {

        const name =
            user?.name ||
            user?.fullName ||
            "Student";

        authNav.innerHTML = `

            <div class="auth-user">

                <span class="auth-greeting">

                    👋 Hi, ${escapeHTML(name)}

                </span>

                <button
                    class="logout-btn"
                    id="navbarLogout"
                    type="button">

                    Logout

                </button>

            </div>

        `;

        const logoutButton =
            document.getElementById("navbarLogout");

        logoutButton?.addEventListener(
            "click",
            handleLogout
        );

    }

    /* ==========================================
       LOGGED OUT
    ========================================== */

    else {

        authNav.innerHTML = `

            <div class="auth-actions">

                <a
                    href="login.html"
                    class="nav-login">

                    Login

                </a>

                <a
                    href="login.html#register"
                    class="nav-register">

                    Register

                </a>

            </div>

        `;

    }

}


/* ==========================================
   LOGOUT
========================================== */

function handleLogout() {

    localStorage.removeItem("token");

    localStorage.removeItem("currentUser");

    closeMobileMenu();

    window.location.href = "index.html";

}


/* ==========================================
   BASIC HTML ESCAPING
========================================== */

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}
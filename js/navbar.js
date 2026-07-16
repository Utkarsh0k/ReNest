async function loadNavbar() {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    const response = await fetch("components/navbar.html");

    navbar.innerHTML = await response.text();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const authNav = document.getElementById("authNav");

    if (!authNav) return;

    if (currentUser) {

        authNav.innerHTML = `

            <span class="nav-user">

                Hi, ${currentUser.name}

            </span>

            <button
                id="logoutNavBtn"
                class="nav-logout">

                Logout

            </button>

        `;

        document
            .getElementById("logoutNavBtn")
            .addEventListener("click", () => {

                localStorage.removeItem("currentUser");

                if (typeof showToast === "function") {

                    showToast("Logged Out Successfully", "success");

                }

                setTimeout(() => {

                    window.location.href = "index.html";

                }, 800);

            });

    } else {

        authNav.innerHTML = `

            <a href="login.html" class="login-btn">

                Login

            </a>

        `;

    }

}

document.addEventListener("DOMContentLoaded", loadNavbar);
/* ==========================================
   Elements
========================================== */

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const formTitle = document.getElementById("form-title");
const toggleText = document.getElementById("toggleText");

let isLogin = true;

/* ==========================================
   Already Logged In
========================================== */

if (localStorage.getItem("currentUser")) {

    window.location.href = "marketplace.html";

}

/* ==========================================
   Toggle Forms
========================================== */

function updateView() {

    if (isLogin) {

        loginForm.style.display = "flex";
        registerForm.style.display = "none";

        formTitle.textContent = "Welcome";

        toggleText.innerHTML = `
            Don't have an account?
            <span id="toggleLink">Register</span>
        `;

    }

    else {

        loginForm.style.display = "none";
        registerForm.style.display = "flex";

        formTitle.textContent = "Create Account";

        toggleText.innerHTML = `
            Already have an account?
            <span id="toggleLink">Login</span>
        `;

    }

    document
        .getElementById("toggleLink")
        .onclick = () => {

            isLogin = !isLogin;

            updateView();

        };

}

updateView();



/* ==========================================
   Register
========================================== */

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document
        .getElementById("registerName")
        .value
        .trim();

    const email = document
        .getElementById("registerEmail")
        .value
        .trim()
        .toLowerCase();

    const password = document
        .getElementById("registerPassword")
        .value;

    const confirm = document
        .getElementById("confirmPassword")
        .value;

    if (name.length < 3) {

        showToast(

            "Name is too short.",

            "error"

        );

        return;

    }

    if (password.length < 6) {

        showToast(

            "Password must be at least 6 characters.",

            "error"

        );

        return;

    }

    if (password !== confirm) {

        showToast(

            "Passwords do not match.",

            "error"

        );

        return;

    }

    try {

    const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name,
                email,
                password

            })

        }

    );

    const data = await response.json();

    if (!response.ok) {

        showToast(data.message, "error");

        return;

    }

    showToast("Account Created Successfully!", "success");

    registerForm.reset();

    isLogin = true;

    updateView();

}

catch {

    showToast("Server Error", "error");

}
    setTimeout(() => {

        window.location.href = "marketplace.html";

    }, 1000);

});

/* ==========================================
   Login
========================================== */

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document
        .getElementById("loginEmail")
        .value
        .trim()
        .toLowerCase();

    const password = document
        .getElementById("loginPassword")
        .value;
try {

    const response = await fetch(

        "http://localhost:5000/api/auth/login",

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email,
                password

            })

        }

    );

    const data = await response.json();

    if (!response.ok) {

        showToast(data.message, "error");

        return;

    }

    localStorage.setItem(

        "token",

        data.token

    );

    localStorage.setItem(

        "currentUser",

        JSON.stringify(data.user)

    );

    showToast(

        `Welcome ${data.user.name}!`,

        "success"

    );

    setTimeout(() => {

        window.location.href = "marketplace.html";

    }, 800);

}

catch {

    showToast("Server Error", "error");

}
    
});
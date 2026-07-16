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

        formTitle.textContent = "Welcome Back";

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
   Users
========================================== */

let users = JSON.parse(

    localStorage.getItem("users")

) || [];

/* ==========================================
   Register
========================================== */

registerForm.addEventListener("submit", (e) => {

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

    const exists = users.find(

        user => user.email === email

    );

    if (exists) {

        showToast(

            "Email already registered.",

            "error"

        );

        return;

    }

    const user = {

        id: Date.now(),

        name,

        email,

        password

    };

    users.push(user);

    localStorage.setItem(

        "users",

        JSON.stringify(users)

    );

    localStorage.setItem(

        "currentUser",

        JSON.stringify(user)

    );

    showToast(

        "Account Created Successfully!",

        "success"

    );

    registerForm.reset();

    setTimeout(() => {

        window.location.href = "marketplace.html";

    }, 1000);

});

/* ==========================================
   Login
========================================== */

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = document
        .getElementById("loginEmail")
        .value
        .trim()
        .toLowerCase();

    const password = document
        .getElementById("loginPassword")
        .value;

    const user = users.find(u =>

        u.email === email &&
        u.password === password

    );

    if (!user) {

        showToast(

            "Invalid Email or Password.",

            "error"

        );

        return;

    }

    localStorage.setItem(

        "currentUser",

        JSON.stringify(user)

    );

    showToast(

        `Welcome ${user.name}!`,

        "success"

    );

    setTimeout(() => {

        window.location.href = "marketplace.html";

    }, 800);

});
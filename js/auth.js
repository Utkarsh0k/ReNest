// ---------- Elements ----------

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const formTitle = document.getElementById("form-title");
const toggleText = document.getElementById("toggleText");

let isLogin = true;

// ---------- Toggle Forms ----------

function updateView() {

    if (isLogin) {

        loginForm.style.display = "flex";
        registerForm.style.display = "none";

        formTitle.textContent = "Welcome Back";

        toggleText.innerHTML =
        `Don't have an account?
        <span id="toggleLink">Register</span>`;

    }

    else {

        loginForm.style.display = "none";
        registerForm.style.display = "flex";

        formTitle.textContent = "Create Account";

        toggleText.innerHTML =
        `Already have an account?
        <span id="toggleLink">Login</span>`;

    }

    document
        .getElementById("toggleLink")
        .addEventListener("click", () => {

            isLogin = !isLogin;
            updateView();

        });

}

updateView();

// ---------- Local Storage ----------

let users = JSON.parse(localStorage.getItem("users")) || [];

// ---------- Register ----------

registerForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("registerName").value.trim();

    const email = document.getElementById("registerEmail").value.trim().toLowerCase();

    const password = document.getElementById("registerPassword").value;

    const confirm = document.getElementById("confirmPassword").value;

    if(password !== confirm){

        alert("Passwords do not match.");

        return;

    }

    const exists = users.find(user => user.email === email);

    if(exists){

        alert("Email already exists.");

        return;

    }

    const user = {

        id: Date.now(),

        name,

        email,

        password

    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    showToast("Account Created Successfully");

    isLogin = true;

    updateView();

    registerForm.reset();

});

// ---------- Login ----------

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();

    const password = document.getElementById("loginPassword").value;

    const user = users.find(u =>

        u.email === email &&
        u.password === password

    );

    if(!user){

        alert("Invalid email or password.");

        return;

    }

    localStorage.setItem(

        "currentUser",

        JSON.stringify(user)

    );

    window.location.href = "marketplace.html";

});
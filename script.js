// TAB SWITCHING

const tabLogin = document.getElementById("tabLogin");
const tabSignup = document.getElementById("tabSignup");

const formLogin = document.getElementById("formLogin");
const formSignup = document.getElementById("formSignup");

const titleEl = document.getElementById("mainTitle");
const subtitleEl = document.getElementById("subtitle");
const statusEl = document.getElementById("status");

function showStatus(text, type = "error") {
  statusEl.hidden = false;
  statusEl.textContent = text;
  statusEl.style.background = type === "success" ? "#ecfdf5" : "#fff1f2";
  statusEl.style.color = type === "success" ? "#3c6492ff" : "#b91c1c";
}

function clearStatus() {
  statusEl.hidden = true;
  statusEl.textContent = "";
}

function activateLogin() {
  tabLogin.classList.add("active");
  tabSignup.classList.remove("active");
  formLogin.classList.add("active");
  formSignup.classList.remove("active");
  titleEl.textContent = "Welcome Back!";
  subtitleEl.textContent = "Enter your details to access your account";
  clearStatus();
}

function activateSignup() {
  tabSignup.classList.add("active");
  tabLogin.classList.remove("active");
  formSignup.classList.add("active");
  formLogin.classList.remove("active");
  titleEl.textContent = "Join TaskMaster";
  subtitleEl.textContent = "Create an account to boost your productivity";
  clearStatus();
}

tabLogin.addEventListener("click", activateLogin);
tabSignup.addEventListener("click", activateSignup);
activateLogin();

// PASSWORD TOGGLE

document.querySelectorAll(".eye-btn").forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const input = document.getElementById(targetId);
    if (!input) return;

    input.type = input.type === "password" ? "text" : "password";
  });
});


// VALIDATION

function isValidEmail(email) {
  try {
    return window.validator && window.validator.isEmail(String(email));
  } catch {
    return /\S+@\S+\.\S+/.test(email);
  }
}


// SIGNUP or CREATE ACCOUNT)

formSignup.addEventListener("submit", function (e) {
  e.preventDefault();
  clearStatus();

  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!username || !email || !password) {
    showStatus("Please fill in all fields.");
    return;
  }
  if (!isValidEmail(email)) {
    showStatus("Invalid email address.");
    return;
  }
  if (password.length < 6) {
    showStatus("Password must be at least 6 characters.");
    return;
  }

  //SAVE USER
  localStorage.setItem("tm_username", username);
  localStorage.setItem("tm_email", email);
  localStorage.setItem("tm_password", password);


  showStatus("Account created — redirecting…", "success");

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 800);
});

// =======================
// LOGIN
// =======================
formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  clearStatus();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    showStatus("Please enter both email and password.");
    return;
  }
  if (!isValidEmail(email)) {
    showStatus("Invalid email address.");
    return;
  }

  // CHECK STORED USER
  const savedEmail = localStorage.getItem("tm_email");
  const savedUsername = localStorage.getItem("tm_username");

 // if (email !== savedEmail) {
    //showStatus("Account not found. Please sign up first.");
    //return;
  //}

  showStatus("Signing in…", "success");

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 800);
});


// HELP BUTTONS

document.getElementById("helpLogin").onclick = () =>
  alert("Need help? Contact taskmanager@gmail.com");
document.getElementById("helpSignup").onclick = () =>
  alert("Need help creating an account? Contact taskmanager@gmail.com");


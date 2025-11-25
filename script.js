const tabLogin = document.getElementById("tabLogin");
const tabSignup = document.getElementById("tabSignup");

const formLogin = document.getElementById("formLogin");
const formSignup = document.getElementById("formSignup");

const titleEl = document.getElementById("mainTitle");
const subtitleEl = document.getElementById("subtitle");

const statusEl = document.getElementById("status");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const btnLogin = document.getElementById("btnLogin");

const signupUsername = document.getElementById("signupUsername");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const btnSignup = document.getElementById("btnSignup");

function showStatus(text, type = "error") {
  statusEl.hidden = false;
  statusEl.textContent = text;
  if (type === "success") {
    statusEl.style.background = "#ecfdf5";
    statusEl.style.color = "#065f46";
  } else {
    statusEl.style.background = "#fff1f2";
    statusEl.style.color = "#b91c1c";
  }
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

document.querySelectorAll(".eye-btn").forEach(button => {
  button.addEventListener("click", (e) => {
    const targetId = button.getAttribute("data-target") || button.dataset.target;
    const input = document.getElementById(targetId);
    if (!input) return;

    if (input.type === "password") {
      input.type = "text";
      button.innerHTML = '<span class="material-symbols-outlined">visibility_off</span>';
      button.setAttribute("aria-label", "Hide password");
    } else {
      input.type = "password";
      button.innerHTML = '<span class="material-symbols-outlined">visibility</span>';
      button.setAttribute("aria-label", "Show password");
    }
  });
});

function isValidEmail(email) {
  try {
    return window.validator && window.validator.isEmail(String(email));
  } catch (err) {
    return /\S+@\S+\.\S+/.test(email);
  }
}

function fakePost(url, payload) {
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(resp => {
    if (!resp.ok) throw new Error("Network error");
    return resp.json();
  });
}

formLogin.addEventListener("submit", async function (ev) {
  ev.preventDefault();
  clearStatus();

  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  if (!email || !password) {
    showStatus("Please enter both email and password.");
    return;
  }
  if (!isValidEmail(email)) {
    showStatus("Please enter a valid email address.");
    return;
  }
  if (password.length < 6) {
    showStatus("Password must be at least 6 characters.");
    return;
  }

  showStatus("Signing in…", "success");

  const payload = { action: "login", email, password, ts: new Date().toISOString() };

  try {
    const data = await fakePost("/login", payload);
    showStatus("Login successful — redirecting…", "success");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 900);
  } catch (err) {
    showStatus("Login failed. Please try again.");
    console.error("Login error", err);
  }
});

formSignup.addEventListener("submit", async function (ev) {
  ev.preventDefault();
  clearStatus();

  const username = signupUsername.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value;

  if (!username || !email || !password) {
    showStatus("Please fill in all fields.");
    return;
  }
  if (!isValidEmail(email)) {
    showStatus("Please enter a valid email address.");
    return;
  }
  if (password.length < 6) {
    showStatus("Password must be at least 6 characters.");
    return;
  }

  showStatus("Creating account…", "success");

  const payload = { action: "signup", username, email, password, ts: new Date().toISOString() };

  try {
    const data = await fakePost("/signup", payload);
    showStatus("Account created — redirecting…", "success");
    setTimeout(() => {
       window.location.href = "dashboard.html";
    }, 900);
     
  } catch (err) {
    showStatus("Signup failed. Please try again.");
    console.error("Signup error", err);
  }
});

document.getElementById("helpLogin").addEventListener("click", () => {
  alert("Need help? Contact taskmanager@gmail.com");
});
document.getElementById("helpSignup").addEventListener("click", () => {
  alert("Need help creating an account? Contact taskmanager@gmail.com");
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const alertContainer = document.getElementById("alertContainer");

  const DEMO_USER = "timon";
  const DEMO_PASS = "winbert123-";

  if (!form || !usernameInput || !passwordInput || !loginBtn || !alertContainer) {
    console.error("Login page is missing a required element.");
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alertContainer.innerHTML = "";

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username === DEMO_USER && password === DEMO_PASS) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      window.location.href = "dashboard.html";
      return;
    }

    alertContainer.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Invalid username or password. Please try again.
        <button type="button" class="btn-close" data-bs-dismiss="alert"
          aria-label="Close"></button>
      </div>
    `;

    passwordInput.value = "";
    passwordInput.focus();
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const alertContainer = document.getElementById('alertContainer');

  const DEMO_USER = 'timon';
  const DEMO_PASS = 'winbert123';

  loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    alertContainer.innerHTML = '';

    if (username === DEMO_USER && password === DEMO_PASS) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      window.location.href = 'dashboard.html';
    } else {
      alertContainer.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          Invalid username or password. Please try again.
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
      `;
    }
  });

  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      loginBtn.click();
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Protect the page
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'index.html';
    return;
  }

  var username = localStorage.getItem('username') || 'Student';
  document.getElementById('userDisplay').textContent = 'Hi, Student';

  setGreeting();
  updateStatistics();

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
  });
});

function setGreeting() {
  var hour = new Date().getHours();
  var greeting = 'Hello';

  if (hour < 12) {
    greeting = 'Good Morning';
  } else if (hour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  document.getElementById('greeting').textContent = greeting + ', Student!';
}

function updateStatistics() {
  document.getElementById('stat1-title').textContent = 'Overall GPA';
  document.getElementById('stat1-value').textContent = '3.78';

  document.getElementById('stat2-title').textContent = 'Current Courses';
  document.getElementById('stat2-value').textContent = '5';

  document.getElementById('stat3-title').textContent = 'Pending Assignments';
  document.getElementById('stat3-value').textContent = '3';

  document.getElementById('stat4-title').textContent = 'Attendance';
  document.getElementById('stat4-value').textContent = '94%';
}
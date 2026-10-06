document.addEventListener("DOMContentLoaded", function () {
  // Redirect to the login page if the user is not logged in.
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
    return;
  }

  const username = localStorage.getItem("username") || "Student";

  document.getElementById("userDisplay").textContent = "Hi, " + username;
  setGreeting(username);
  updateStatistics();
  setupSearch();
  setupExport();
  displayAlert();
  displayCharts();
  simulateRealTimeUpdate();

  // Show all activities on initial load.
  displayActivities(getActivities());

  // Inventory Setup
  setupNavigation();
  displayInventoryTable();
  setupInventoryForm();
  setupInventoryExport();

  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "index.html";
  });
});

function setGreeting(username) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" :
    hour < 18 ? "Good Afternoon" :
    "Good Evening";

  document.getElementById("greeting").textContent =
    greeting + ", " + username + "!";
}

function updateStatistics() {
  document.getElementById("stat1-value").textContent = "3.78";
  document.getElementById("stat2-value").textContent = "5";
  document.getElementById("stat3-value").textContent =
    getActivitiesByStatus("Pending").length;
  document.getElementById("stat4-value").textContent = "94%";
}

function displayActivities(data) {
  const tableBody = document.getElementById("activityTableBody");
  tableBody.replaceChildren();

  if (data.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 4;
    cell.className = "text-center py-3";
    cell.textContent = "No activities found.";

    row.appendChild(cell);
    tableBody.appendChild(row);
    return;
  }

  data.forEach(function (activity) {
    const row = document.createElement("tr");

    [activity.activity, activity.course, activity.status, activity.date]
      .forEach(function (value) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });

    tableBody.appendChild(row);
  });
}

function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  const courseFilter = document.getElementById("courseFilter");
  const statusFilter = document.getElementById("statusFilter");

  function applySearchAndFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedCourse = courseFilter.value;
    const selectedStatus = statusFilter.value;

    const filteredActivities = getActivities().filter(function (activity) {
      const matchesSearch =
        activity.activity.toLowerCase().includes(query) ||
        activity.course.toLowerCase().includes(query) ||
        activity.status.toLowerCase().includes(query);

      const matchesCourse =
        selectedCourse === "all" || activity.course === selectedCourse;

      const matchesStatus =
        selectedStatus === "all" || activity.status === selectedStatus;

      return matchesSearch && matchesCourse && matchesStatus;
    });

    displayActivities(filteredActivities);
  }

  searchInput.addEventListener("input", applySearchAndFilters);
  courseFilter.addEventListener("change", applySearchAndFilters);
  statusFilter.addEventListener("change", applySearchAndFilters);
}

function setupExport() {
  document.getElementById("exportBtn").addEventListener("click", function () {
    const rows = [
      ["Activity", "Course", "Status", "Date"],
      ...getActivities().map(activity => [
        activity.activity,
        activity.course,
        activity.status,
        activity.date
      ])
    ];

    const csv = rows
      .map(row =>
        row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "student_activities.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  });
}

function displayCharts() {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js did not load; charts will not be displayed.");
    return;
  }

  const courseCanvas = document.getElementById("courseChart");
  const statusCanvas = document.getElementById("statusChart");

  if (!courseCanvas || !statusCanvas) return;

  const courseStats = getCourseStatistics();
  const statusStats = getStatusStatistics();

  new Chart(courseCanvas, {
    type: "bar",
    data: {
      labels: Object.keys(courseStats),
      datasets: [{
        label: "Number of Activities",
        data: Object.values(courseStats),
        backgroundColor: "#0d6efd"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 }
        }
      }
    }
  });

  new Chart(statusCanvas, {
    type: "doughnut",
    data: {
      labels: Object.keys(statusStats),
      datasets: [{
        label: "Activity Status",
        data: Object.values(statusStats),
        backgroundColor: ["#198754", "#0d6efd", "#ffc107", "#dc3545", "#6c757d"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true
    }
  });
}

function displayAlert() {
  const pendingCount = getActivitiesByStatus("Pending").length;
  const alertSection = document.getElementById("alertSection");

  alertSection.replaceChildren();

  const alert = document.createElement("div");
  alert.className = pendingCount > 0
    ? "alert alert-warning"
    : "alert alert-success";
  alert.setAttribute("role", "status");

  alert.textContent = pendingCount > 0
    ? `⚠️ Student Alert: You have ${pendingCount} pending activity/activities that may need your attention.`
    : "✓ All caught up! You have no pending activities.";

  alertSection.appendChild(alert);
}

function simulateRealTimeUpdate() {
  window.setInterval(displayAlert, 10000);
}

// --- INVENTORY & NAVIGATION LOGIC ---

function setupNavigation() {
  const navDashboard = document.getElementById("nav-dashboard");
  const navInventory = document.getElementById("nav-inventory");
  const dashboardSection = document.getElementById("dashboard-section");
  const inventorySection = document.getElementById("inventory-section");

  navDashboard.addEventListener("click", function(e) {
    e.preventDefault();
    navDashboard.classList.add("active");
    navInventory.classList.remove("active");
    dashboardSection.classList.remove("d-none");
    inventorySection.classList.add("d-none");
  });

  navInventory.addEventListener("click", function(e) {
    e.preventDefault();
    navInventory.classList.add("active");
    navDashboard.classList.remove("active");
    inventorySection.classList.remove("d-none");
    dashboardSection.classList.add("d-none");
  });
}

function displayInventoryTable() {
  const tableBody = document.getElementById("inventoryTableBody");
  tableBody.replaceChildren();
  const items = getInventory();

  if (items.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.className = "text-center py-3 text-muted";
    cell.textContent = "Inventory is empty.";
    row.appendChild(cell);
    tableBody.appendChild(row);
    return;
  }

  items.forEach(function (item) {
    const row = document.createElement("tr");
    [item.item, item.category, item.quantity, item.date].forEach(function (value) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
}

function setupInventoryForm() {
  const form = document.getElementById("addInventoryForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newItem = {
      item: document.getElementById("itemName").value.trim(),
      category: document.getElementById("itemCategory").value,
      quantity: document.getElementById("itemQuantity").value,
      date: new Date().toISOString().split('T')[0] // Formats as YYYY-MM-DD
    };

    addInventoryItem(newItem);
    displayInventoryTable(); // Refresh the table
    form.reset(); // Clear the inputs
  });
}

function setupInventoryExport() {
  document.getElementById("exportInventoryBtn").addEventListener("click", function () {
    const rows = [
      ["Item Name", "Category", "Quantity", "Date Added"],
      ...getInventory().map(item => [
        item.item,
        item.category,
        item.quantity,
        item.date
      ])
    ];

    const csv = rows
      .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "inventory_stock.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    URL.revokeObjectURL(url);
  });
}
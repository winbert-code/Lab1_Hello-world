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
    displayActivities(getActivities());
    displayAlert();

    // Lab 4 features
    setupSearch();
    setupExport();
    displayCharts();
    simulateRealTimeUpdate();

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

    document.getElementById('greeting').textContent =
        greeting + ', Student!';
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


// Display activities in the table
function displayActivities(data) {

    var tableBody = document.getElementById('activityTableBody');

    tableBody.innerHTML = '';

    if (data.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">
                    No activities found.
                </td>
            </tr>
        `;

        return;
    }

    data.forEach(function(activity) {

        var row = document.createElement('tr');

        row.innerHTML = `
            <td>${activity.activity}</td>
            <td>${activity.course}</td>
            <td>${activity.status}</td>
            <td>${activity.date}</td>
        `;

        tableBody.appendChild(row);
    });
}


// Search and filter functionality
function setupSearch() {

    var searchInput = document.getElementById('searchInput');
    var courseFilter = document.getElementById('courseFilter');
    var statusFilter = document.getElementById('statusFilter');

    function applySearchAndFilters() {

        var activities = getActivities();

        var query = searchInput.value.toLowerCase();
        var selectedCourse = courseFilter.value;
        var selectedStatus = statusFilter.value;

        // Search
        if (query !== '') {

            activities = activities.filter(function(activity) {

                return activity.activity.toLowerCase().includes(query) ||
                       activity.course.toLowerCase().includes(query) ||
                       activity.status.toLowerCase().includes(query);

            });
        }

        // Course filter
        if (selectedCourse !== 'all') {

            activities = activities.filter(function(activity) {
                return activity.course === selectedCourse;
            });
        }

        // Status filter
        if (selectedStatus !== 'all') {

            activities = activities.filter(function(activity) {
                return activity.status === selectedStatus;
            });
        }

        displayActivities(activities);
    }

    searchInput.addEventListener('input', applySearchAndFilters);
    courseFilter.addEventListener('change', applySearchAndFilters);
    statusFilter.addEventListener('change', applySearchAndFilters);
}


// Export activities to CSV
function setupExport() {

    var exportBtn = document.getElementById('exportBtn');

    exportBtn.addEventListener('click', function() {

        var activities = getActivities();

        var csv = 'Activity,Course,Status,Date\n';

        activities.forEach(function(activity) {

            csv += `"${activity.activity}","${activity.course}","${activity.status}","${activity.date}"\n`;

        });

        var blob = new Blob([csv], {
            type: 'text/csv'
        });

        var url = URL.createObjectURL(blob);

        var link = document.createElement('a');

        link.href = url;
        link.download = 'student_activities.csv';

        link.click();

        URL.revokeObjectURL(url);
    });
}


// Create charts
function displayCharts() {

    var courseStats = getCourseStatistics();
    var statusStats = getStatusStatistics();

    // Course Activity Chart
    new Chart(document.getElementById('courseChart'), {

        type: 'bar',

        data: {
            labels: Object.keys(courseStats),

            datasets: [{
                label: 'Number of Activities',
                data: Object.values(courseStats)
            }]
        },

        options: {
            responsive: true
        }
    });


    // Activity Status Chart
    new Chart(document.getElementById('statusChart'), {

        type: 'doughnut',

        data: {
            labels: Object.keys(statusStats),

            datasets: [{
                label: 'Activity Status',
                data: Object.values(statusStats)
            }]
        },

        options: {
            responsive: true
        }
    });
}


// Display pending activity alert
function displayAlert() {

    var pendingActivities = getActivitiesByStatus('Pending');

    var alertSection = document.getElementById('alertSection');

    if (pendingActivities.length > 0) {

        alertSection.innerHTML = `
            <div class="alert alert-warning" role="alert">
                <strong>⚠️ Student Alert:</strong>
                You have ${pendingActivities.length}
                pending activity/activities that may need your attention.
            </div>
        `;

    } else {

        alertSection.innerHTML = `
            <div class="alert alert-success" role="alert">
                <strong>✓ All caught up!</strong>
                You have no pending activities.
            </div>
        `;
    }
}


// Simulated real-time activity update
function simulateRealTimeUpdate() {

    setInterval(function() {

        // Refresh the alert
        displayAlert();

    }, 10000);
}
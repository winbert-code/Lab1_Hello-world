// Student Portal Data Manager

let activities = [
    {
        id: 1,
        activity: "Submitted Assignment",
        course: "Web Development",
        status: "Completed",
        date: "2026-08-24"
    },
    {
        id: 2,
        activity: "Quiz Taken",
        course: "Database Systems",
        status: "Graded",
        date: "2026-08-23"
    },
    {
        id: 3,
        activity: "New Announcement",
        course: "Software Engineering",
        status: "Unread",
        date: "2026-08-22"
    },
    {
        id: 4,
        activity: "Assignment Due Soon",
        course: "Data Structures",
        status: "Pending",
        date: "2026-08-21"
    },
    {
        id: 5,
        activity: "Grade Posted",
        course: "Computer Networks",
        status: "Viewed",
        date: "2026-08-20"
    },
    {
        id: 6,
        activity: "Assignment Submitted",
        course: "Database Systems",
        status: "Completed",
        date: "2026-08-19"
    },
    {
        id: 7,
        activity: "Quiz Taken",
        course: "Web Development",
        status: "Graded",
        date: "2026-08-18"
    }
];

// Get all activities
function getActivities() {
    return activities;
}

// Get activities by course
function getActivitiesByCourse(course) {
    return activities.filter(activity =>
        activity.course === course
    );
}

// Get activities by status
function getActivitiesByStatus(status) {
    return activities.filter(activity =>
        activity.status === status
    );
}

// Search activities
function searchActivities(query) {
    query = query.toLowerCase();

    return activities.filter(activity =>
        activity.activity.toLowerCase().includes(query) ||
        activity.course.toLowerCase().includes(query) ||
        activity.status.toLowerCase().includes(query)
    );
}

// Get course statistics
function getCourseStatistics() {
    const statistics = {};

    activities.forEach(activity => {
        if (!statistics[activity.course]) {
            statistics[activity.course] = 0;
        }

        statistics[activity.course]++;
    });

    return statistics;
}

// Get activity status statistics
function getStatusStatistics() {
    const statistics = {};

    activities.forEach(activity => {
        if (!statistics[activity.status]) {
            statistics[activity.status] = 0;
        }

        statistics[activity.status]++;
    });

    return statistics;
}
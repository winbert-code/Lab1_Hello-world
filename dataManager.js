const activities = [
  {
    activity: "Submitted Assignment",
    course: "Web Development",
    status: "Completed",
    date: "2026-08-24"
  },
  {
    activity: "Quiz Taken",
    course: "Database Systems",
    status: "Graded",
    date: "2026-08-23"
  },
  {
    activity: "New Announcement",
    course: "Software Engineering",
    status: "Unread",
    date: "2026-08-22"
  },
  {
    activity: "Assignment Due Soon",
    course: "Data Structures",
    status: "Pending",
    date: "2026-08-21"
  },
  {
    activity: "Grade Posted",
    course: "Computer Networks",
    status: "Viewed",
    date: "2026-08-20"
  }
];

function getActivities() {
  return activities.map(activity => ({ ...activity }));
}

function getActivitiesByStatus(status) {
  return activities.filter(activity => activity.status === status);
}

function getCourseStatistics() {
  return activities.reduce((stats, activity) => {
    stats[activity.course] = (stats[activity.course] || 0) + 1;
    return stats;
  }, {});
}

function getStatusStatistics() {
  return activities.reduce((stats, activity) => {
    stats[activity.status] = (stats[activity.status] || 0) + 1;
    return stats;
  }, {});
}

// --- INVENTORY DATA MANAGEMENT ---
const inventoryData = [
  { item: "Whiteboard Markers", category: "Supplies", quantity: 50, date: "2026-10-01" },
  { item: "Projectors", category: "Electronics", quantity: 8, date: "2026-10-03" },
  { item: "Desk Chairs", category: "Furniture", quantity: 25, date: "2026-10-05" }
];

function getInventory() {
  return inventoryData.map(item => ({ ...item }));
}

function addInventoryItem(newItem) {
  inventoryData.push(newItem);
}
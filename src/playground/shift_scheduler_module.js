// Shift Scheduler Module for RocketLang
// Date: May 5, 2025
const Database = require('better-sqlite3');
const db = new Database('C:/CodeRocket/src/rocketlang.db');

const metadata = {
    name: "shift_scheduler",
    description: "Manages shifts and tasks for workers",
    useCases: ["scheduling", "workforce", "events"],
    compatibleApps: ["voyage_tracker", "ecommerce", "school"]
};

function initTables() {
    db.prepare('CREATE TABLE IF NOT EXISTS shift_schedules (id INTEGER PRIMARY KEY, worker_id TEXT, shift_type TEXT, start_time TEXT, end_time TEXT)').run();
    db.prepare('CREATE TABLE IF NOT EXISTS shift_tasks (id INTEGER PRIMARY KEY, shift_id INTEGER, task_name TEXT)').run();
}

function scheduleShift(workerName, shiftType, startTime, endTime) {
    const existingShift = db.prepare('SELECT * FROM shift_schedules WHERE worker_id = ? AND start_time < ? AND end_time > ?').get(workerName, endTime, startTime);
    if (existingShift) {
        throw new Error(`Shift conflict for ${workerName}: Overlapping shift exists.`);
    }
    const stmt = db.prepare('INSERT INTO shift_schedules (worker_id, shift_type, start_time, end_time) VALUES (?, ?, ?, ?)');
    stmt.run(workerName, shiftType, startTime, endTime);
    console.log(`Scheduled ${shiftType} shift for ${workerName}: ${startTime} to ${endTime}`);
}

function addTaskToShift(shiftId, taskName) {
    const stmt = db.prepare('INSERT INTO shift_tasks (shift_id, task_name) VALUES (?, ?)');
    stmt.run(shiftId, taskName);
    console.log(`Added task "${taskName}" to shift ${shiftId}`);
}

module.exports = { metadata, scheduleShift, addTaskToShift };
initTables();
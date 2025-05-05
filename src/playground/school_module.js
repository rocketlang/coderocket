// School Module for RocketLang
// Date: May 5, 2025
const Database = require('better-sqlite3');
const db = new Database('C:/CodeRocket/src/rocketlang.db');

const metadata = {
    name: "school",
    description: "Manages school timetables and attendance",
    useCases: ["scheduling", "attendance"],
    compatibleApps: ["project_management"]
};

function initTables() {
    db.prepare('CREATE TABLE IF NOT EXISTS timetables (id INTEGER PRIMARY KEY, grade TEXT, subject TEXT, date TEXT)').run();
    db.prepare('CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, student_name TEXT, attendance TEXT)').run();
}

function scheduleExam(grade, subject, date) {
    const stmt = db.prepare('INSERT INTO timetables (grade, subject, date) VALUES (?, ?, ?)');
    stmt.run(grade, subject, date);
    console.log(`Scheduled exam for ${grade}, Subject: ${subject}, Date: ${date}`);
}

function markAttendance(studentName, status) {
    const stmt = db.prepare('INSERT INTO students (student_name, attendance) VALUES (?, ?)');
    stmt.run(studentName, status);
    console.log(`Marked ${studentName} as ${status}`);
}

module.exports = { metadata, scheduleExam, markAttendance };
initTables();
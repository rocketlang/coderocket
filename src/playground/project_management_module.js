// Project Management Module for RocketLang
// Date: May 5, 2025
const Database = require('better-sqlite3');
const db = new Database('C:/CodeRocket/src/rocketlang.db');

const metadata = {
    name: "project_management",
    description: "Manages projects, tasks, and resources",
    useCases: ["project_management", "scheduling"],
    compatibleApps: ["school"]
};

function initTables() {
    db.prepare('CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY, project_name TEXT)').run();
    db.prepare('CREATE TABLE IF NOT EXISTS project_tasks (id INTEGER PRIMARY KEY, project_id INTEGER, task_name TEXT)').run();
}

function createProject(projectName) {
    const stmt = db.prepare('INSERT INTO projects (project_name) VALUES (?)');
    stmt.run(projectName);
    console.log(`Created project: ${projectName}`);
}

function addTaskToProject(projectId, taskName) {
    const stmt = db.prepare('INSERT INTO project_tasks (project_id, task_name) VALUES (?, ?)');
    stmt.run(projectId, taskName);
    console.log(`Added task "${taskName}" to project ${projectId}`);
}

module.exports = { metadata, createProject, addTaskToProject };
initTables();
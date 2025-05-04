// Voyage Tracker Demo
// Date: May 6, 2025
const Database = require('better-sqlite3');
const db = new Database('C:/CodeRocket/src/rocketlang.db');

function initVoyageTracker() {
    console.log("Voyage Tracker Started!", { font: "Noto Sans Devanagari" });
    console.log("place ship at 0,0"); // Spark
    console.log("move ship to 100,200"); // Orbit
    console.log("show 'Ship Moved!' on screen"); // English
    console.log("dikhao 'Jahaz Hila!' on screen", { font: "Noto Sans Devanagari" }); // Hindi
    // Store position in SQLite
    const stmt = db.prepare('INSERT INTO components (name, price, badge) VALUES (?, ?, ?)');
    stmt.run('ship_position', 0, 'Orbit');
}

initVoyageTracker();
// E-Commerce Module for RocketLang
// Date: May 5, 2025
const Database = require('better-sqlite3');
const db = new Database('C:/CodeRocket/src/rocketlang.db');
const shiftScheduler = require('./shift_scheduler_module');

const metadata = {
    name: "ecommerce",
    description: "Manages online stores, orders, and inventory",
    useCases: ["inventory", "orders", "scheduling"],
    compatibleApps: ["voyage_tracker"]
};

function initTables() {
    db.prepare('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, product_name TEXT, price REAL)').run();
    db.prepare('CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, product_id INTEGER, quantity INTEGER, total_cost REAL, status TEXT)').run();
}

function addProduct(productName, price) {
    const stmt = db.prepare('INSERT INTO products (product_name, price) VALUES (?, ?)');
    stmt.run(productName, price);
    console.log(`Added product: ${productName}, Price: $${price}`);
}

function processOrder(productId, quantity) {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
    const totalCost = product.price * quantity;
    const stmt = db.prepare('INSERT INTO orders (product_id, quantity, total_cost, status) VALUES (?, ?, ?, ?)');
    stmt.run(productId, quantity, totalCost, "pending");
    console.log(`Processed order for "${product.product_name}", Quantity: ${quantity}, Total: $${totalCost}, Status: pending`);
    shiftScheduler.scheduleShift("Anil", "morning", "2025-05-08T06:00:00", "2025-05-08T14:00:00");
}

module.exports = { metadata, addProduct, processOrder };
initTables();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../database/leadyfy.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log("Database Connection Failed", err);
    } else {
        console.log("Database Connected Successfully");

        db.run(`
            CREATE TABLE IF NOT EXISTS leads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customerName TEXT,
                mobileNumber TEXT,
                loanType TEXT,
                loanAmount TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
});

module.exports = db;
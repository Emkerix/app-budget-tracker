const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../public/budget.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database');
})

module.exports = db;
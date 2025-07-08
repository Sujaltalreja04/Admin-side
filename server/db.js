const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',      // your password here
  database: 'admin_details' // your database name
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

db.query('SELECT * FROM profile_details ORDER BY ID DESC LIMIT 1', (err, rows) => {
  console.log('Last row in table:', rows);
});

module.exports = db;

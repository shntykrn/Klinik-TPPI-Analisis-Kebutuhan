const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',       // atau 127.0.0.1
  user: 'root',            // user default phpMyAdmin XAMPP
  password: '',            // kosong (jika belum diubah)
  database: 'klinik_tppi', // nama database dari SQL dump kamu
  PORT : 3306,         // port default MySQL
});

module.exports = db;

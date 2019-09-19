const mysql = require("mysql");


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "users"
});

con.connect()


con.query(`CREATE TABLE IF NOT EXISTS users (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    user_name VARCHAR(40) UNIQUE NOT NULL,
    password BINARY(60),
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;`)

module.exports = con;

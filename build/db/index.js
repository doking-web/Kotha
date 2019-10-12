"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
console.log("pass", process.env.DB_PASSWORD);
exports.connection = mysql_1.default.createConnection({
    host: "localhost",
    user: "kotha",
    password: process.env.DB_PASSWORD || "",
    database: "kotha",
});
exports.connection.connect((err) => {
    if (err)
        console.log(err);
});
// USERS
exports.connection.query(`CREATE TABLE IF NOT EXISTS users (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    user_name VARCHAR(40) UNIQUE NOT NULL,
    password BINARY(60),
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;`);
// PROFILE
exports.connection.query(`CREATE TABLE IF NOT EXISTS profile (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(_id),
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    dob DATETIME NOT NULL,
    gender TINYINT NOT NULL,
    phone_no BIGINT UNIQUE NOT NULL,
    public_id BIGINT UNIQUE NOT NULL
)  ENGINE=INNODB;`);
// CONVERSETION
exports.connection.query(`CREATE TABLE IF NOT EXISTS conversetion (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    FOREIGN KEY (user1_id) REFERENCES users(_id),
    FOREIGN KEY (user2_id) REFERENCES users(_id)
)  ENGINE=INNODB;`);
// MESSEGES
exports.connection.query(`CREATE TABLE IF NOT EXISTS messeges (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    messege_text VARCHAR(1500),
    date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    conversetion_id INT NOT NULL,
    FOREIGN KEY (conversetion_id) REFERENCES conversetion(_id),
    extra VARCHAR(50)
)  ENGINE=INNODB;`);

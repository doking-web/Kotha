const mysql = require("mysql");


const con = mysql.createConnection({
	host: "localhost",
	user: "kotha",
	password: process.env.DB_PASSWORD || "",
    database: "kotha",
});

con.connect((err)=> {
	if (err) console.log(err);
});

// USERS
con.query(`CREATE TABLE IF NOT EXISTS users (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    user_name VARCHAR(40) UNIQUE NOT NULL,
    password BINARY(60),
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;`);

// PROFILE
con.query(`CREATE TABLE IF NOT EXISTS profile (
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

// MESSEGES
con.query(`CREATE TABLE IF NOT EXISTS messeges (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    messege_text VARCHAR(1500),
    date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    extra VARCHAR(50)
)  ENGINE=INNODB;`);


// CONVERSETION
con.query(`CREATE TABLE IF NOT EXISTS conversetion (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    messege_id INT NOT NULL,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    FOREIGN KEY (messege_id) REFERENCES messeges(_id),
    FOREIGN KEY (user1_id) REFERENCES users(_id),
    FOREIGN KEY (user2_id) REFERENCES users(_id)
)  ENGINE=INNODB;`);

// USER_CONVERSETION
con.query(`CREATE TABLE IF NOT EXISTS user_conversetion (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    conversetion_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(_id),
    FOREIGN KEY (conversetion_id) REFERENCES conversetion(_id),
    type TINYINT DEFAULT 1
)  ENGINE=INNODB;`);


module.exports = con;

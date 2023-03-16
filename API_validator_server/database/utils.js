const mysql = require("mysql2/promise");

//연결 설정
const pool = mysql.createPool({
  // Host IP
  host: "localhost",
  // mysql username
  user: "ssafy",
  // mysql user password
  password: "ssafy_8_A",
  // db name
  database: "sapiv",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { pool };

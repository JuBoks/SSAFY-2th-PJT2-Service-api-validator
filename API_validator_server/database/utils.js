const mysql = require("mysql2/promise");

//연결 설정
const pool = mysql.createPool({
  // Host IP
  host: "j8s002.p.ssafy.io",
  port: 3305,
  // mysql username
  user: "...",
  // mysql user password
  password: "...",
  // db name
  database: "sapiv",
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { pool };

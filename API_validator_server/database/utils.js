require("dotenv").config();
const mysql = require("mysql2/promise");

//연결 설정
const pool = mysql.createPool({
  // Host IP
  host: process.env.DB_HOST,
  // Host Port
  port: process.env.DB_PORT,
  // mysql username
  user: process.env.DB_USER,
  // mysql user password
  password: process.env.DB_PASSWORD,
  // db name
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const getConnection = async() => {
  return await pool.getConnection(async conn => conn); 
}

module.exports = { getConnection };
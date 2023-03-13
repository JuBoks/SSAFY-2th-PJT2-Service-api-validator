/*
data access layer
*/
const mysql = require("mysql");

//연결 설정
const cnn = mysql.createConnection({
    host: 'localhost',
    user: 'ssafy',
    password: '1214',
    database: 'test'
});


exports.get_users = (callback) => {
    cnn.query("SELECT * FROM users", (err, rows) => {
        if (err) throw err;
       callback(rows);
        //return rows;
    });
}
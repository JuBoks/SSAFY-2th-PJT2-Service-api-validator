/*
  data access layer
*/
const { pool } = require("./utils");

const getResponseByMetaId = async (meta_id) => {
  try {
    let sql = "SELECT response_id FROM tbl_metadata WHERE meta_id = ?";
    let params = [meta_id];
    let [rows, fields] = await pool.query(sql, params);
    const result_id = rows[0].response_id;

    //expect response 조회
    if (result_id !== null) {
      sql = "SELECT * FROM tbl_expect_response_log WHERE response_id = ?";
      params = [result_id];
      [rows, fields] = await pool.query(sql, params);
      // console.log(rows[0]);
      return rows[0];
    } else return null;
  } catch (error) {
    return error;
  }
};

//test result 저장
const saveTestResult = async (data) => {
  try {
    //insert 한 데이터를 반환해준다고 함
    var sql =
      "INSERT INTO tbl_test_result (meta_id, data_id, action_id, response_id, response, result) values (?, ?, ?, ?, ?, ?)";
    const result = await pool.query(sql, data);
    return result.result_id;
  } catch (error) {
    return error;
  }
};

module.exports = { getResponseByMetaId, saveTestResult };

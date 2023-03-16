/*
  data access layer
*/
const { pool } = require("./utils");

const getAnalyzedDataByDataId = async (data_id) => {
  try {
    // data_id로 schema 찾기
    let sql = "SELECT result_data FROM tbl_analyzed_data WHERE data_id = ?";
    let params = [data_id];
    let [rows, fields] = await pool.query(sql, params);
    // console.log(rows);
    return rows[0].result_data;
  } catch (error) {
    return error;
  }
};

const getResponseByMetaId = async (meta_id) => {
  try {
    // meta_id로 해당 시점에서 기대하는 response의 schema를 가리키는 response_id를 찾는다
    let sql = "SELECT response_id FROM tbl_metadata WHERE meta_id = ?";
    let params = [meta_id];
    let [rows, fields] = await pool.query(sql, params);
    const result_id = rows[0].response_id;

    // 찾은 response_id를 통해 expect response 조회
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

const createAnalyzedData = async (schema) => {
  try {
    //insert 한 데이터를 반환해준다고 함
    var sql = "INSERT INTO tbl_analyzed_data (result_data) values (?)";
    const [rows, fields] = await pool.query(sql, JSON.stringify(schema));
    return rows.insertId;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//test result 저장
const createTestResult = async (data) => {
  try {
    //insert 한 데이터를 반환해준다고 함
    var sql =
      "INSERT INTO tbl_test_result (meta_id, data_id, action_id, response_id, response, result) values (?, ?, ?, ?, ?, ?)";
    const [rows, fields] = await pool.query(sql, data);
    return rows.insertId;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getApiList = async () => {
  try {
    // let sql = "SELECT * FROM tbl_metadata WHERE state = 0";
    let sql = `SELECT *, TIMESTAMPDIFF(HOUR, meta.last_req_time, now()) as time_diff FROM tbl_api as api
      INNER JOIN tbl_domain as domain
      ON api.domain_id = domain.domain_id
      INNER JOIN tbl_metadata as meta
      ON meta.api_id = api.api_id
      WHERE TIMESTAMPDIFF(HOUR, meta.last_req_time, now()) > meta.cycle_time or meta.last_req_time is null
      and meta.state = 0 and api.state = 0 and domain.state = 0`;
    const [rows, fields] = await pool.query(sql);
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getResponseByMetaId,
  getAnalyzedDataByDataId,
  createTestResult,
  createAnalyzedData,
  getApiList,
};

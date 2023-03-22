const getAnalyzedDataByDataId = async (conn, data_id) => {
  try {
    // data_id로 schema 찾기
    let sql = "SELECT result_data FROM tbl_analyzed_data WHERE data_id = ?";
    let params = [data_id];
    let [rows, fields] = await conn.query(sql, params);
    // console.log(rows);
    return rows[0].result_data;
  } catch (error) {
    throw error;
  }
};

const getResponseByMetaId = async (conn, meta_id) => {
  try {
    // meta_id로 해당 시점에서 기대하는 response의 schema를 가리키는 response_id를 찾는다
    let sql = "SELECT response_id FROM tbl_metadata WHERE meta_id = ?";
    let params = [meta_id];
    let [rows, fields] = await conn.query(sql, params);
    const result_id = rows[0].response_id;

    // 찾은 response_id를 통해 expect response 조회
    if (result_id !== null) {
      sql = "SELECT * FROM tbl_expect_response_log WHERE response_id = ?";
      params = [result_id];
      [rows, fields] = await conn.query(sql, params);
      return rows[0];
    } else return null;
  } catch (error) {
    throw error;
  }
};

const createAnalyzedData = async (conn, schema) => {
  try {
    //insert 한 데이터를 반환해준다고 함
    var sql = "INSERT INTO tbl_analyzed_data (result_data) values (?)";
    const [rows, fields] = await conn.query(sql, JSON.stringify(schema));
    return rows.insertId;
  } catch (error) {
    throw error;
  }
};

//test result 저장
const createTestResult = async (conn, data) => {
  try {
    //insert 한 데이터를 반환해준다고 함
    var sql =
      "INSERT INTO tbl_test_result (meta_id, data_id, action_id, response_id, response, result) values (?, ?, ?, ?, ?, ?)";
    const [rows, fields] = await conn.query(sql, data);
    return rows.insertId;
  } catch (error) {
    throw error;
  }
};

const getApiList = async (conn) => {
  try {
    let sql = `SELECT * FROM tbl_metadata as meta
      INNER JOIN tbl_api as api
      ON api.api_id = meta.api_id
      INNER JOIN tbl_domain as domain
      ON domain.domain_id = api.domain_id
      WHERE (meta.last_req_time is null or (UNIX_TIMESTAMP(NOW()) - meta.last_req_time) div 3600 >= meta.cycle_time)
      and meta.state = 0 and api.state = 0 and domain.state = 0`;
    const [rows, _] = await conn.query(sql);
    return rows;
  } catch (error) {
    return error;
  }
};

const updateMetaRequestTime = async (conn, meta_id) => {
  try {
    let sql =
      "UPDATE tbl_metadata SET last_req_time = UNIX_TIMESTAMP(NOW()) WHERE (meta_id = ?);";
    let params = [meta_id];
    const [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getResponseByMetaId,
  getAnalyzedDataByDataId,
  createTestResult,
  createAnalyzedData,
  getApiList,
  updateMetaRequestTime,
};

const { pool } = require("./utils");

const getAllApis = async (domain_id) => {
  try {
    let sql = "SELECT * FROM tbl_api WHERE domain_id = ?";
    let params = [domain_id];
    let [rows, fields] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const createNewApi = async (newApi) => {
  try {
    let sql =
      "INSERT INTO tbl_api (method, resources, domain_id) values (?, ?, ?)";
    let params = [newApi.method, newApi.resources, newApi.domain_id];
    let [rows, fields] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const updateOneApi = async (apiId, changes) => {
  try {
    let sql =
      "UPDATE tbl_api SET method = ?, resources = ?, domain_id = ? WHERE api_id = ?";
    let params = [changes.method, changes.resources, changes.domain_id, apiId];
    let [rows, fields] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const deleteOneApi = async (apiId) => {
  try {
    let sql = "UPDATE tbl_api SET state = 1 WHERE api_id = ?";
    let params = [apiId];
    let [rows, fields] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const getApi = async (api_id) => {
  try {
    let sql = "SELECT * FROM tbl_api WHERE api_id = ?";
    let params = [api_id];
    let [rows, fields] = await pool.query(sql, params);
    return rows[0];
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllApis,
  createNewApi,
  updateOneApi,
  deleteOneApi,
  getApi
};

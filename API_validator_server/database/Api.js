const http_method = { 0: "GET", 1: "POST", 2: "PUT", 3: "DELETE" };

const createNewApi = async (conn, newApi) => {
  try {
    let sql = `SELECT * From tbl_api WHERE method = ? and resources = ? and domain_id = ? and state = 0`;
    let params = [newApi.method, newApi.resources, newApi.domain_id];
    let [rows, _] = await conn.query(sql, params);
    if (rows.length) {
      throw {
        status: 400,
        message: `Api '${http_method[newApi.method]}':'${
          newApi.resources
        }' already exists`,
      };
    }
    sql = "INSERT INTO tbl_api (method, resources, domain_id) values (?, ?, ?)";
    params = [newApi.method, newApi.resources, newApi.domain_id];
    [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getAllApis = async (conn, domainId) => {
  try {
    if(domainId) {
      let sql = "SELECT * FROM tbl_api WHERE domain_id = ? and state = 0";
      let params = [domainId];
      let [rows, _] = await conn.query(sql, params);
      return rows;
    }
    else {
      let sql = "SELECT * FROM tbl_api WHERE and state = 0";
      let [rows, _] = await conn.query(sql);
      return rows;
    }
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneApi = async (conn, apiId) => {
  try {
    let sql = "SELECT * FROM tbl_api WHERE api_id = ? and state = 0";
    let params = [apiId];
    let [rows, _] = await conn.query(sql, params);
    if (!rows.length) {
      throw {
        status: 400,
        message: `Can't find api with the id '${apiId}'`,
      };
    }
    return rows[0];
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneApi = async (conn, apiId, changes) => {
  try {
    let sql = `SELECT * From tbl_api WHERE api_id = ? and state = 0`;
    let params = [apiId];
    let [rows, _] = await conn.query(sql, params);
    if (!rows.length) {
      throw {
        status: 400,
        message: `Can't find api with the id '${apiId}'`,
      };
    }
    sql = `SELECT * From tbl_api WHERE method = ? and resources = ? and domain_id = ? and state = 0`;
    params = [changes.method, changes.resources, changes.domain_id];
    [rows, _] = await conn.query(sql, params);
    if (rows.length) {
      throw {
        status: 400,
        message: `Api '${http_method[changes.method]}':'${
          changes.resources
        }' already exists`,
      };
    }

    sql =
      "UPDATE tbl_api SET method = ?, resources = ?, domain_id = ? WHERE api_id = ?";
    params = [changes.method, changes.resources, changes.domain_id, apiId];
    [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const deleteOneApi = async (conn, apiId) => {
  try {
    let sql = "UPDATE tbl_api SET state = 1 WHERE api_id = ?";
    let params = [apiId];
    let [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

module.exports = {
  getAllApis,
  getOneApi,
  createNewApi,
  updateOneApi,
  deleteOneApi,
};

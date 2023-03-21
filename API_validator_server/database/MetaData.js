const getAllMetadatas = async (conn, api_id) => {
  try {
    let sql = "SELECT * FROM tbl_metadata WHERE api_id = ?";
    let params = [api_id];
    let [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const getMetaData = async (conn, metaId) => {
  try {
    let sql = "SELECT * FROM tbl_metadata WHERE meta_id = ? AND state = 0";
    let params = [metaId];
    let [rows, fields] = await conn.query(sql, params);
    if (rows.length == 0) throw new Error("No Content");
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const createMetadata = async (conn, apiId, body) => {
  try {
    let sql =
      "INSERT INTO tbl_metadata (api_id, name, header, params, body, cycle_time) VALUES (?, ?, ?, ?, ?, ?)";
    let params = [
      apiId,
      body.name,
      JSON.stringify(body.header),
      JSON.stringify(body.params),
      JSON.stringify(body.body),
      body.cycle_time,
    ];
    let [rows, fields] = await conn.query(sql, params);
    return rows.insertId;
  } catch (error) {
    throw error;
  }
};


const createExpectResponse = async (conn, metaId, dataId, response) => {
  try {
    let sql =
      "INSERT INTO tbl_expect_response_log (meta_id, data_id, response) VALUES (?, ?, ?)";
    let params = [metaId, dataId, JSON.stringify(response)];
    let [rows, fields] = await conn.query(sql, params);
    return rows.insertId;
  } catch (error) {
    throw error;
  }
};

const updateResponseIdInMetadata = async (conn, metaId, responseId) => {
  try {
    let sql = "UPDATE tbl_metadata SET response_id = ? WHERE meta_id = ?";
    let params = [metaId, responseId];
    let [rows, fields] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const updateOneMeta = async (conn, metaId, changes) => {
  try {
    let sql =
      "UPDATE tbl_metadata SET api_id = ?, response_id = ?, header = ?, params = ?, body = ?, name = ?, cycle_time = ? WHERE meta_id = ?";
    let params = [
      changes.api_id,
      changes.response_id,
      changes.header,
      changes.params,
      changes.body,
      changes.name,
      changes.cycle_time,
      metaId,
    ];
    let [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const deleteOneMeta = async (conn, metaId) => {
  try {
    let sql = "UPDATE tbl_metadata SET state = 1 WHERE meta_id = ?";
    let params = [metaId];
    let [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllMetadatas,
  createMetadata,
  getMetaData,
  createExpectResponse,
  updateResponseIdInMetadata,
  updateOneMeta,
  deleteOneMeta,
};

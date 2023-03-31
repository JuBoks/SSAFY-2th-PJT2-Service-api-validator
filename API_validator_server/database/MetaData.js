const createNewMetadata = async (conn, newMeta) => {
  try {
    let sql =
      "INSERT INTO tbl_metadata (api_id, name, header, params, body, cycle_time) VALUES (?, ?, ?, ?, ?, ?)";
    let params = [
      newMeta.api_id,
      newMeta.name,
      JSON.stringify(newMeta.header),
      JSON.stringify(newMeta.params),
      JSON.stringify(newMeta.body),
      newMeta.cycle_time,
    ];
    let [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getMetadatasCnt = async (conn) => {
  try {
    let sql = `SELECT count(*) as 'cnt' FROM tbl_metadata as meta
    INNER JOIN tbl_api as api
    ON api.api_id = meta.api_id
    INNER JOIN tbl_domain as domain
    ON domain.domain_id = api.domain_id
    WHERE meta.state = 0 and api.state = 0 and domain.state = 0`;
    let [rows, _] = await conn.query(sql);
    return rows[0].cnt;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getAllMetadatas = async (conn, apiId) => {
  try {
    let sql = "SELECT * FROM tbl_metadata WHERE api_id = ? and state = 0";
    let params = [apiId];
    let [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneMetadata = async (conn, metaId) => {
  try {
    let sql = "SELECT * FROM tbl_metadata WHERE meta_id = ? and state = 0";
    let params = [metaId];
    let [rows, _] = await conn.query(sql, params);
    if (!rows.length) {
      throw {
        status: 400,
        message: `Can't find metadata with the id '${metaId}'`,
      };
    }
    return rows[0];
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneMetadata = async (conn, metaId, changes) => {
  try {
    let sql = `SELECT * From tbl_metadata WHERE meta_id = ? and state = 0`;
    let params = [metaId];
    let [rows, _] = await conn.query(sql, params);
    if (!rows.length) {
      throw {
        status: 400,
        message: `Can't find metadata with the id '${metaId}'`,
      };
    }
    sql =
      "UPDATE tbl_metadata SET api_id = ?, response_id = ?, header = ?, params = ?, body = ?, name = ?, cycle_time = ? WHERE meta_id = ?";
    params = [
      changes.api_id,
      changes.response_id,
      JSON.stringify(changes.header),
      JSON.stringify(changes.params),
      JSON.stringify(changes.body),
      changes.name,
      changes.cycle_time,
      metaId,
    ];
    [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const deleteOneMetadata = async (conn, metaId) => {
  try {
    let sql = "UPDATE tbl_metadata SET state = 1 WHERE meta_id = ?";
    let params = [metaId];
    let [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const createExpectResponse = async (conn, metaId, dataId, response) => {
  try {
    let sql =
      "INSERT INTO tbl_expect_response_log (meta_id, data_id, response) VALUES (?, ?, ?)";
    let params = [metaId, dataId, JSON.stringify(response)];
    let [rows, _] = await conn.query(sql, params);
    return rows.insertId;
  } catch (error) {
    throw error;
  }
};

const updateResponseIdInMetadata = async (conn, metaId, responseId) => {
  try {
    let sql = "UPDATE tbl_metadata SET response_id = ? WHERE meta_id = ?";
    let params = [responseId, metaId];
    let [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMetadatas,
  createNewMetadata,
  getOneMetadata,
  createExpectResponse,
  updateResponseIdInMetadata,
  updateOneMetadata,
  deleteOneMetadata,
  getMetadatasCnt,
};

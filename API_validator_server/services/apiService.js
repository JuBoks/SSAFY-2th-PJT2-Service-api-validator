const Api = require("../database/Api");
const pool = require("../database/utils");


const getAllApis = async (domain_id) => {
  const conn = await pool.getConnection();

  try {
    const allApis = await Api.getAllApis(conn, domain_id);
    return allApis;
  } catch (error) {
    throw error;
  }
  finally {
    conn.release();
  }
};

const createNewApi = async (newApi) => {
  const conn = await pool.getConnection();

  try {
    const createdApi = await Api.createNewApi(conn, newApi);
    return createdApi;
  } catch (error) {
    throw error;
  }
  finally {
    conn.release();
  }
};

const updateOneApi = async (apiId, changes) => {
  const conn = await pool.getConnection();

  try {
    const updatedApi = await Api.updateOneApi(conn, apiId, changes);
    return updatedApi;
  } catch (error) {
    throw error;
  }
  finally {
    conn.release();
  }
};

const deleteOneApi = async (apiId) => {
  const conn = await pool.getConnection();

  try {
    await Api.deleteOneApi(conn, apiId);
  } catch (error) {
    throw error;
  }
  finally {
    conn.release();
  }
};

module.exports = {
  getAllApis,
  createNewApi,
  updateOneApi,
  deleteOneApi,
};

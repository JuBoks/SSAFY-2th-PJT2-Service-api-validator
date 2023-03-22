const Api = require("../database/Api");
const pool = require("../database/utils");

const createNewApi = async (newApi) => {
  const conn = await pool.getConnection();
  try {
    const createdApi = await Api.createNewApi(conn, newApi);
    return createdApi;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const getAllApis = async (domainId) => {
  const conn = await pool.getConnection();
  try {
    const allApis = await Api.getAllApis(conn, domainId);
    return allApis;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const getOneApi = async (apiId) => {
  const conn = await pool.getConnection();
  try {
    const domain = await Api.getOneApi(conn, apiId);
    return domain;
  } catch (error) {
    throw error;
  } finally {
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
  } finally {
    conn.release();
  }
};

const deleteOneApi = async (apiId) => {
  const conn = await pool.getConnection();
  try {
    await Api.deleteOneApi(conn, apiId);
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  getAllApis,
  getOneApi,
  createNewApi,
  updateOneApi,
  deleteOneApi,
};

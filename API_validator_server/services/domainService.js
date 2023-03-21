const Domain = require("../database/Domain");
const pool = require("../database/utils");

const createNewDomain = async (newDomain) => {
  const conn = await pool.getConnection();
  try {
    const createdDomain = await Domain.createNewDomain(conn, newDomain);
    return createdDomain;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const getAllDomains = async (categoryId) => {
  const conn = await pool.getConnection();
  try {
    const allDomains = await Domain.getAllDomains(conn, categoryId);
    return allDomains;
  } catch (error) {
    throw error;
  }
};

const getOneDomain = async (domainId) => {
  const conn = await pool.getConnection();
  try {
    const domain = await Domain.getOneDomain(conn, domainId);
    return domain;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const updateOneDomain = async (domainId, changes) => {
  const conn = await pool.getConnection();
  try {
    const updatedDomain = await Domain.updateOneDomain(conn, domainId, changes);
    return updatedDomain;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const deleteOneDomain = async (domainId) => {
  const conn = await pool.getConnection();
  try {
    await Domain.deleteOneDomain(conn, domainId);
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  getAllDomains,
  getOneDomain,
  createNewDomain,
  updateOneDomain,
  deleteOneDomain,
};

const createNewDomain = async (conn, newDomain) => {
  try {
    let sql = `SELECT * From tbl_domain WHERE domain = ? and category_id = ? and state = 0`;
    let params = [newDomain.domain, newDomain.category_id];
    let [rows, _] = await conn.query(sql, params);
    if (rows.length) {
      throw {
        status: 400,
        message: `Domain '${newDomain.domain}' already exists`,
      };
    }
    sql = "INSERT INTO tbl_domain (name, domain, category_id) values (?, ?, ?)";
    params = [newDomain.name, newDomain.domain, newDomain.category_id];
    [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getAllDomains = async (conn, categoryId) => {
  try {
    let sql = "SELECT * FROM tbl_domain WHERE category_id = ? and state = 0";
    let params = [categoryId];
    let [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneDomain = async (conn, domainId) => {
  try {
    let sql = "SELECT * FROM tbl_domain WHERE domain_id = ? and state = 0";
    let params = [domainId];
    let [rows, _] = await conn.query(sql, params);
    if (!rows.length) {
      throw {
        status: 400,
        message: `Can't find domain with the id '${domainId}'`,
      };
    }
    return rows[0];
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneDomain = async (conn, domainId, changes) => {
  try {
    let sql = `SELECT * From tbl_domain WHERE domain_id = ? and state = 0`;
    let params = [domainId];
    let [rows, _] = await conn.query(sql, params);
    if (!rows.length) {
      throw {
        status: 400,
        message: `Can't find domain with the id '${domainId}'`,
      };
    }
    sql = `SELECT * From tbl_domain WHERE domain = ? and category_id = ? and state = 0`;
    params = [changes.domain, changes.category_id];
    [rows, _] = await conn.query(sql, params);
    if (rows.length) {
      throw {
        status: 400,
        message: `Domain '${changes.domain}' already exists`,
      };
    }
    sql =
      "UPDATE tbl_domain SET name = ?, domain = ?, category_id = ? WHERE domain_id = ?";
    params = [changes.name, changes.domain, changes.category_id, domainId];
    [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const deleteOneDomain = async (conn, domainId) => {
  try {
    let sql = "UPDATE tbl_domain SET state = 1 WHERE domain_id = ?";
    let params = [domainId];
    let [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

module.exports = {
  getAllDomains,
  getOneDomain,
  createNewDomain,
  updateOneDomain,
  deleteOneDomain,
};

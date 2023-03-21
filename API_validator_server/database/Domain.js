
const getAllDomains = async (conn, category_id) => {
  try {
    let sql = "SELECT * FROM tbl_domain WHERE category_id = ?";
    let params = [category_id];
    let [rows, fields] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const createNewDomain = async (conn, newDomain) => {
  try {
    let sql =
      "INSERT INTO tbl_domain (name, domain, category_id) values (?, ?, ?)";
    let params = [newDomain.name, newDomain.domain, newDomain.category_id];
    let [rows, fields] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const updateOneDomain = async (conn, domainId, changes) => {
  try {
    let sql =
      "UPDATE tbl_domain SET name = ?, domain = ?, category_id = ? WHERE domain_id = ?";
    let params = [changes.name, changes.domain, changes.category_id, domainId];
    let [rows, fields] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const deleteOneDomain = async (conn, domainId) => {
  try {
    let sql = "UPDATE tbl_domain SET state = 1 WHERE domain_id = ?";
    let params = [domainId];
    let [rows, fields] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const getDomain = async (conn, domain_id) => {
  try {
    let sql = "SELECT * FROM tbl_domain WHERE domain_id = ?";
    let params = [domain_id];
    let [rows, fields] = await conn.query(sql, params);
    return rows[0];
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllDomains,
  createNewDomain,
  updateOneDomain,
  deleteOneDomain,
  getDomain
};

const createNewCategory = async (conn, newCategory) => {
  try {
    let sql = `SELECT * From tbl_category WHERE name = ? and state = 0`;
    let params = [newCategory.name];
    let [rows, _] = await conn.query(sql, params);
    if (rows.length) {
      throw {
        status: 400,
        message: `Category with the name '${newCategory.name}' already exists`,
      };
    }
    sql = "INSERT INTO tbl_category (name, note) values (?, ?)";
    params = [newCategory.name, newCategory.note];
    [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getAllCategories = async (conn) => {
  try {
    let sql = "SELECT * FROM tbl_category WHERE state = 0";
    let [rows, _] = await conn.query(sql);
    return rows;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneCategory = async (conn, categoryId) => {
  try {
    let sql =
      "SELECT * FROM tbl_category WHERE category_id = ? WHERE state = 0";
    let params = [categoryId];
    let [rows, _] = await conn.query(sql, params);
    if (!rows.length) {
      throw {
        status: 400,
        message: `Can't find category with the id '${categoryId}'`,
      };
    }
    return rows;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneCategory = async (conn, categoryId, changes) => {
  try {
    let sql = `SELECT * From tbl_category WHERE name = ? and state = 0`;
    let params = [changes.name];
    let [rows, _] = await conn.query(sql, params);
    if (rows.length) {
      throw {
        status: 400,
        message: `Category with the name '${newCategory.name}' already exists`,
      };
    }

    sql = `SELECT * From tbl_category WHERE category_id = ? and state = 0`;
    params = [categoryId];
    [rows, _] = await conn.query(sql, params);
    if (!rows.length) {
      throw {
        status: 400,
        message: `Can't find category with the id '${categoryId}'`,
      };
    }
    sql = "UPDATE tbl_category SET name = ?, note = ? WHERE category_id = ?";
    params = [changes.name, changes.note, categoryId];
    [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const deleteOneCategory = async (conn, categoryId) => {
  try {
    let sql = "UPDATE tbl_category SET state = 1 WHERE category_id = ?";
    let params = [categoryId];
    let [rows, _] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

module.exports = {
  getAllCategories,
  getOneCategory,
  createNewCategory,
  updateOneCategory,
  deleteOneCategory,
};


const getAllCategories = async (conn) => {
  try {
    let sql = "SELECT * FROM tbl_category";
    let [rows, fields] = await conn.query(sql);
    return rows;
  } catch (error) {
    return error;
  }
};

const createNewCategory = async (conn, newCategory) => {
  try {
    let sql = "INSERT INTO tbl_category (name, note) values (?, ?)";
    let params = [newCategory.name, newCategory.note];
    let [rows, fields] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const updateOneCategory = async (conn, categoryId, changes) => {
  try {
    let sql =
      "UPDATE tbl_category SET name = ?, note = ? WHERE category_id = ?";
    let params = [changes.name, changes.note, categoryId];
    let [rows, fields] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const deleteOneCategory = async (conn, categoryId) => {
  try {
    let sql = "UPDATE tbl_category SET state = 1 WHERE category_id = ?";
    let params = [categoryId];
    let [rows, fields] = await conn.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllCategories,
  createNewCategory,
  updateOneCategory,
  deleteOneCategory,
};

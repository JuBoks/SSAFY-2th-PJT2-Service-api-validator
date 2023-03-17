const { pool } = require("./utils");

const getAllCategories = async () => {
  try {
    let sql = "SELECT * FROM tbl_category";
    let [rows, fields] = await pool.query(sql);
    return rows;
  } catch (error) {
    return error;
  }
};

const createNewCategory = async (newCategory) => {
  try {
    let sql = "INSERT INTO tbl_category (name, note) values (?, ?)";
    let params = [newCategory.name, newCategory.note];
    let [rows, fields] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const updateOneCategory = async (categoryId, changes) => {
  try {
    let sql =
      "UPDATE tbl_category SET name = ?, note = ? WHERE category_id = ?";
    let params = [changes.name, changes.note, categoryId];
    let [rows, fields] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    return error;
  }
};

const deleteOneCategory = async (categoryId) => {
  try {
    let sql = "UPDATE tbl_category SET state = 1 WHERE category_id = ?";
    let params = [categoryId];
    let [rows, fields] = await pool.query(sql, params);
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

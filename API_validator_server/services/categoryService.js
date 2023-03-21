const Category = require("../database/Category");
const pool = require("../database/utils");

const createNewCategory = async (newCategory) => {
  const conn = await pool.getConnection();
  try {
    const createdWorkout = await Category.createNewCategory(conn, newCategory);
    return createdWorkout;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const getAllCategories = async () => {
  const conn = await pool.getConnection();
  try {
    const allCategories = await Category.getAllCategories(conn);
    return allCategories;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const getOneCategory = async (categoryId) => {
  const conn = await pool.getConnection();
  try {
    const category = await Category.getOneCategory(conn, categoryId);
    return category;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const updateOneCategory = async (categoryId, changes) => {
  const conn = await pool.getConnection();
  try {
    const updatedCategory = await Category.updateOneCategory(
      conn,
      categoryId,
      changes
    );
    return updatedCategory;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const deleteOneCategory = async (categoryId) => {
  const conn = await pool.getConnection();
  try {
    await Category.deleteOneCategory(conn, categoryId);
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  getAllCategories,
  getOneCategory,
  createNewCategory,
  updateOneCategory,
  deleteOneCategory,
};

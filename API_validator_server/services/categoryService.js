const Category = require("../database/Category");

const getAllCategories = async () => {
  try {
    const allCategories = await Category.getAllCategories();
    return allCategories;
  } catch (error) {
    throw error;
  }
};

const createNewCategory = async (newCategory) => {
  try {
    const createdWorkout = await Category.createNewCategory(newCategory);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

const updateOneCategory = async (categoryId, changes) => {
  try {
    const updatedCategory = await Category.updateOneCategory(
      categoryId,
      changes
    );
    return updatedCategory;
  } catch (error) {
    throw error;
  }
};

const deleteOneCategory = async (categoryId) => {
  try {
    await Category.deleteOneCategory(categoryId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCategories,
  createNewCategory,
  updateOneCategory,
  deleteOneCategory,
};

const categoryService = require("../services/categoryService");

const createNewCategory = async (req, res) => {
  const { body } = req;
  
  const newCategory = {
    name: body.name,
    note: body.note,
  };
  try {
    const createdCategory = await categoryService.createNewCategory(
      newCategory
    );
    res.status(201).send({
      status: "OK",
      data: { category_id: createdCategory.insertId, ...newCategory },
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await categoryService.getAllCategories();
    res.send({ status: "OK", data: allCategories });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneCategory = async (req, res) => {
  const {
    params: { categoryId },
  } = req;
  
  try {
    const category = await categoryService.getOneCategory(categoryId);
    res.send({ status: "OK", data: category });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneCategory = async (req, res) => {
  const {
    body,
    params: { categoryId },
  } = req;

  try {
    const updatedCategory = await categoryService.updateOneCategory(
      categoryId,
      body
    );
    res.send({ status: "OK", data: { category_id: categoryId, ...body } });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneCategory = async (req, res) => {
  const {
    params: { categoryId },
  } = req;
 
  try {
    await categoryService.deleteOneCategory(categoryId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createNewCategory,
  getAllCategories,
  getOneCategory,
  updateOneCategory,
  deleteOneCategory,
};

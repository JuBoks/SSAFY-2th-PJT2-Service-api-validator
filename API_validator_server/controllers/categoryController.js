const categoryService = require("../services/categoryService");

// About Category
const createNewCategory = async (req, res) => {
  const { body } = req;
  if (!body.name || !body.note) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'note'",
      },
    });
    return;
  }
  const newCategory = {
    name: body.name,
    note: body.note,
  };
  try {
    const createdCategory = await categoryService.createNewCategory(
      newCategory
    );
    res.status(201).send({ status: "OK", data: createdCategory });
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

const getOneCategory = (req, res) => {};

const updateOneCategory = async (req, res) => {
  const {
    body,
    params: { categoryId },
  } = req;
  if (!categoryId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':categoryId' can not be empty" },
    });
  }
  try {
    const updatedCategory = await categoryService.updateOneCategory(
      categoryId,
      body
    );
    res.send({ status: "OK", data: updatedCategory });
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
  if (!categoryId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':categoryId' can not be empty" },
    });
  }
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

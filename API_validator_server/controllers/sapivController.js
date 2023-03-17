const sapivService = require("../services/sapivService");

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
    const createdCategory = await sapivService.createNewCategory(newCategory);
    res.status(201).send({ status: "OK", data: createdCategory });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await sapivService.getAllCategories();
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
    const updatedCategory = await sapivService.updateOneCategory(
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
    await sapivService.deleteOneCategory(categoryId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewDomain = async (req, res) => {
  const { body } = req;
  if (!body.name || !body.domain || !body.category_id) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'domain', 'category_id",
      },
    });
    return;
  }
  const newDomain = {
    name: body.name,
    domain: body.domain,
    category_id: body.category_id,
  };
  try {
    const createdDomain = await sapivService.createNewDomain(newDomain);
    res.status(201).send({ status: "OK", data: createdDomain });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllDomains = async (req, res) => {
  const { body } = req;
  if (!body.category_id) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'category_id",
      },
    });
    return;
  }
  try {
    const allDomains = await sapivService.getAllDomains(body.category_id);
    res.send({ status: "OK", data: allDomains });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneDomain = (req, res) => {};

const updateOneDomain = async (req, res) => {
  const {
    body,
    params: { domainId },
  } = req;
  if (!domainId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':domainId' can not be empty" },
    });
  }
  try {
    const updatedDomain = await sapivService.updateOneDomain(domainId, body);
    res.send({ status: "OK", data: updatedDomain });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneDomain = async (req, res) => {
  const {
    params: { domainId },
  } = req;
  if (!domainId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':domainId' can not be empty" },
    });
  }
  try {
    await sapivService.deleteOneDomain(domainId);
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
  createNewDomain,
  getAllDomains,
  getOneDomain,
  updateOneDomain,
  deleteOneDomain,
};

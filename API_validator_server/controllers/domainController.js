const domainService = require("../services/domainService");

// About Domain
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
    const createdDomain = await domainService.createNewDomain(newDomain);
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
    const allDomains = await domainService.getAllDomains(body.category_id);
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
    const updatedDomain = await domainService.updateOneDomain(domainId, body);
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
    await domainService.deleteOneDomain(domainId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createNewDomain,
  getAllDomains,
  getOneDomain,
  updateOneDomain,
  deleteOneDomain,
};

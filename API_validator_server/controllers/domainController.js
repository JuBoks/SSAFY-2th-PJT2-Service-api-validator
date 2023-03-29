const domainService = require("../services/domainService");

const createNewDomain = async (req, res) => {
  const { body } = req;
  
  const newDomain = {
    name: body.name,
    domain: body.domain,
    category_id: body.category_id,
  };
  try {
    const createdDomain = await domainService.createNewDomain(newDomain);
    res.status(201).send({
      status: "OK",
      data: { domain_id: createdDomain.insertId, ...newDomain },
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllDomains = async (req, res) => {
  const {category_id} = req.query;
  

  try {
    const allDomains = await domainService.getAllDomains(category_id);
    res.send({ status: "OK", data: allDomains });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneDomain = async (req, res) => {
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
    const domain = await domainService.getOneDomain(domainId);
    res.send({ status: "OK", data: domain });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneDomain = async (req, res) => {
  const {
    body,
    params: { domainId },
  } = req;
  
  try {
    const updatedDomain = await domainService.updateOneDomain(domainId, body);
    res.send({
      status: "OK",
      data: { domain_id: domainId, ...body },
    });
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

const apiService = require("../services/apiService");

// About API
const createNewApi = async (req, res) => {
  console.log(req.body);
  const { body } = req;
  if (!body.method || !body.resources || !body.domain_id) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'method', 'resources', 'domain_id",
      },
    });
    return;
  }
  const newApi = {
    method: body.method,
    resources: body.resources,
    domain_id: body.domain_id,
  };
  try {
    const createdApi = await apiService.createNewApi(newApi);
    res.status(201).send({ status: "OK", data: createdApi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllApis = async (req, res) => {
  const { body } = req;
  if (!body.domain_id) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'domain_id",
      },
    });
    return;
  }
  try {
    const allApis = await apiService.getAllApis(body.domain_id);
    res.send({ status: "OK", data: allApis });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneApi = (req, res) => {};

const updateOneApi = async (req, res) => {
  const {
    body,
    params: { apiId },
  } = req;
  if (!apiId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':apiId' can not be empty" },
    });
  }
  try {
    const updatedApi = await apiService.updateOneApi(apiId, body);
    res.send({ status: "OK", data: updatedApi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneApi = async (req, res) => {
  const {
    params: { apiId },
  } = req;
  if (!apiId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':apiId' can not be empty" },
    });
  }
  try {
    await apiService.deleteOneApi(apiId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createNewApi,
  getAllApis,
  getOneApi,
  updateOneApi,
  deleteOneApi,
};

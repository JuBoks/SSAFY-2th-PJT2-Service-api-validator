const apiService = require("../services/apiService");

const createNewApi = async (req, res) => {
  const { body } = req;
  
  const newApi = {
    method: body.method,
    resources: body.resources,
    domain_id: body.domain_id,
  };

  try {
    const createdApi = await apiService.createNewApi(newApi);
    res
      .status(201)
      .send({ status: "OK", data: { api_id: createdApi.insertId, ...newApi } });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllApis = async (req, res) => {
  const { domain_id } = req.query;

  try {
    const allApis = await apiService.getAllApis(domain_id);
    res.send({ status: "OK", data: allApis });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneApi = async (req, res) => {
  const {
    params: { apiId },
  } = req;
  
  try {
    const api = await apiService.getOneApi(apiId);
    res.send({ status: "OK", data: api });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneApi = async (req, res) => {
  const {
    body,
    params: { apiId },
  } = req;
  
  try {
    const updatedApi = await apiService.updateOneApi(apiId, body);
    res.send({ status: "OK", data: { api_id: apiId, ...body } });
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

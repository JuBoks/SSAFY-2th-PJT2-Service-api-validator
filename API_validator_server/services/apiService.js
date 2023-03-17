const Api = require("../database/Api");

const getAllApis = async (domain_id) => {
  try {
    const allApis = await Api.getAllApis(domain_id);
    return allApis;
  } catch (error) {
    throw error;
  }
};

const createNewApi = async (newApi) => {
  try {
    const createdApi = await Api.createNewApi(newApi);
    return createdApi;
  } catch (error) {
    throw error;
  }
};

const updateOneApi = async (apiId, changes) => {
  try {
    const updatedApi = await Api.updateOneApi(apiId, changes);
    return updatedApi;
  } catch (error) {
    throw error;
  }
};

const deleteOneApi = async (apiId) => {
  try {
    await Api.deleteOneApi(apiId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllApis,
  createNewApi,
  updateOneApi,
  deleteOneApi,
};

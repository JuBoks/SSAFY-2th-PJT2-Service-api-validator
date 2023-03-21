const metadata = require("../database/MetaData");
const api = require("../database/Api");
const domain = require("../database/Domain");
const validatorService = require("./validatorService");
const Validator = require("../database/Validator");

const axios = require("axios");

const getAllMetadatas = async (api_id) => {
  try {
    const allMetas = await metadata.getAllMetadatas(api_id);
    return allMetas;
  } catch (error) {
    throw error;
  }
};

const testMetadata = async (metaId) => {
  const metadata_data = await metadata.getMetaData(metaId);
  const api_data = await api.getApi(metadata_data.api_id);
  const domain_data = await domain.getDomain(api_data.domain_id);

  const request = {};
  request.url = domain_data.domain + api_data.resources;

  switch (api_data.method) {
    case 0:
      request.method = "get";
      break;
    case 1:
      request.method = "post";
      break;
    case 2:
      request.method = "put";
      break;
    case 3:
      request.method = "delete";
      break;
  }
  request.headers = metadata_data.header;
  request.params = metadata_data.params;
  request.body = metadata_data.body;

  try {
    const response = await axios(request);
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    };
  } catch (error) {
    var { response } = error;
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    };
  }
};

const createMetadata = async (newMeta) => {
  try {
    const meta_id = await metadata.createMetadata(newMeta);
    return meta_id;
  } catch (error) {
    throw error;
  }
};

const createExpectResponse = async (metaId, response) => {
  try {
    const schema = validatorService(response, Array.isArray(response));

    //자료형 추론 결과 우선 anayled data 테이블에 저장
    const dataId = await Validator.createAnalyzedData(schema);

    //expect response log 저장
    const responseId = await metadata.createExpectResponse(
      metaId,
      dataId,
      response
    );

    //metadata 에 response id 업데이트
    await metadata.updateResponseIdInMetadata(metaId, responseId);

    return responseId;
  } catch (error) {
    throw error;
  }
};

const upadateMetadata = async (metaId, changes) => {
  try {
    const updatedMeta = await metadata.updateOneMeta(metaId, changes);
    return updatedMeta;
  } catch (error) {
    throw error;
  }
};

const deleteMetadata = async (metaId) => {
  try {
    await metadata.deleteOneMeta(metaId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMetadatas,
  createMetadata,
  testMetadata,
  createExpectResponse,
  upadateMetadata,
  deleteMetadata,
};
const metadata = require("../database/MetaData");
const api = require("../database/Api");
const domain = require("../database/Domain");
const Validator = require("../database/Validator");
const pool = require("../database/utils");
const extractRootSchema = require("../apiInference/extractRootSchema");

const axios = require("axios");

const createNewMetadata = async (newMeta) => {
  const conn = await pool.getConnection();
  try {
    const createdMeta = await metadata.createNewMetadata(conn, newMeta);
    return createdMeta;
  } catch (error) {
    throw error;
  } finally {
    conn.commit();
    conn.release();
  }
};

const getAllMetadatas = async (apiId) => {
  const conn = await pool.getConnection();
  try {
    const allMetas = await metadata.getAllMetadatas(conn, apiId);
    return allMetas;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const getOneMetadata = async (metaId) => {
  const conn = await pool.getConnection();
  try {
    const meta = await metadata.getOneMetadata(conn, metaId);
    return meta;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const updateOneMetadata = async (metaId, changes) => {
  const conn = await pool.getConnection();
  try {
    const updatedMeta = await metadata.updateOneMetadata(conn, metaId, changes);
    return updatedMeta;
  } catch (error) {
    throw error;
  } finally {
    conn.commit();
    conn.release();
  }
};

const deleteOneMetadata = async (metaId) => {
  const conn = await pool.getConnection();
  try {
    await metadata.deleteOneMetadata(conn, metaId);
  } catch (error) {
    throw error;
  } finally {
    conn.commit();
    conn.release();
  }
};

const testMetadata = async (metaId) => {
  const conn = await pool.getConnection();
  const request = {};
  try {
    await conn.beginTransaction();
    const metadata_data = await metadata.getOneMetadata(conn, metaId);
    const api_data = await api.getOneApi(conn, metadata_data.api_id);
    const domain_data = await domain.getOneDomain(conn, api_data.domain_id);

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
    request.data = metadata_data.body;

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }

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

const createExpectResponse = async (metaId, response) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const schema = extractRootSchema(response);

    //자료형 추론 결과 우선 anayled data 테이블에 저장
    const dataId = await Validator.createAnalyzedData(conn, schema);

    //expect response log 저장
    const responseId = await metadata.createExpectResponse(
      conn,
      metaId,
      dataId,
      response
    );

    //metadata 에 response id 업데이트
    await metadata.updateResponseIdInMetadata(conn, metaId, responseId);
    await conn.commit();

    return responseId;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  getAllMetadatas,
  getOneMetadata,
  createNewMetadata,
  testMetadata,
  createExpectResponse,
  updateOneMetadata,
  deleteOneMetadata,
};

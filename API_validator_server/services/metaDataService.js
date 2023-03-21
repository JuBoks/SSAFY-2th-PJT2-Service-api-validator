const metadata = require("../database/MetaData");
const api = require("../database/Api");
const domain = require("../database/Domain");
const validatorService = require("./validatorService");
const Validator = require("../database/Validator");
const pool = require("../database/utils");

const axios = require("axios");

const getAllMetadatas = async (api_id) => {
  const conn = await pool.getConnection();

  try {
    const allMetas = await metadata.getAllMetadatas(conn, api_id);
    
    return allMetas;
  } catch (error) {
    throw error;
  }
  finally {
    conn.release();
  }
};

const testMetadata = async (metaId) => {
  const conn = await pool.getConnection();
    const request = {};

    try {
        await conn.beginTransaction();

        const metadata_data = await metadata.getMetaData(conn, metaId);
        const api_data = await api.getApi(conn,metadata_data.api_id);
        const domain_data = await domain.getDomain(conn, api_data.domain_id);


        request.url = domain_data.domain+api_data.resources;

        switch(api_data.method) {
            case 0:
                request.method = "get";
                break;
            case 1:
                request.method = "post";
                break;
            case 2:
                request.method =  "put";
                break;
            case 3:
                request.method = "delete";
                break;
        }
        request.headers = metadata_data.header;
        request.params = metadata_data.params;
        request.body = metadata_data.body;
        
        await conn.commit();
    }
    catch(error) {
        await conn.rollback();
        throw error;
    }
    finally {
        conn.release();
    }

    try {

        const response = await axios(request);
        return {
            "status" : response.status,
            "statusText": response.statusText,
            "data" : response.data,
        }
    }
    catch(error) {
        var {response} = error;
        return {
            "status": response.status,
            "statusText" : response.statusText, 
            "data" : response.data};
    }
};

const createMetadata = async (apiId, body) => {
  const conn = await pool.getConnection();

  try {
      const meta_id = await metadata.createMetadata(conn, apiId, body);

      return meta_id;
  }
  catch(error) {
      throw error;
  }
  finally {
    conn.release();
  }
}


const createExpectResponse = async (metaId, response) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const schema = validatorService.inferSchema(response, Array.isArray(response));

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
  } catch(error) {
    await conn.rollback();
      throw error;
  }
  finally {
    conn.release();
  }
};

const upadateMetadata = async (metaId, changes) => {
  const conn = await pool.getConnection();
  
  try {
    const updatedMeta = await metadata.updateOneMeta(conn, metaId, changes);

    return updatedMeta;
  } catch(error) {
    throw error;
  }
  finally {
    conn.release();
  }
};

const deleteMetadata = async (metaId) => {
  const conn = await pool.getConnection();

  try {
    await metadata.deleteOneMeta(conn, metaId);
    
  } catch(error) {
      throw error;
  }
  finally {
    conn.release();
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

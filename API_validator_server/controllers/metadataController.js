const metadataService = require("../services/metadataService");

const getAllMetadatas = async (req, res) => {
  const {apiId} = req.params;

  try {
    const data = metadataService.getAllMetadatas(apiId);

    //await apiService.deleteOneApi(apiId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createMetadata = async (req, res) => {
    const {apiId} = req.params;
    const {body} = req;
    
    try {
      const api_id = await metadataService.createMetadata(apiId, body);
      res.status(200).send({ "api_id" : api_id });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateMetadata = async (req, res) => {
  const {metaId} = req.params;
  try{
      const data = await metadataService.updateMetadata(metaId);
      res.send({ data });
  }catch (error) { 

  }
};

const deleteMetadata = async (req, res) => {
  const {metaId} = req.params;
  try{
      const data = await metadataService.updateMetadata(metaId);
      res.send({ data });
  }catch (error) { 

  }
};


const testMetadata = async (req, res) => {
    const {metaId} = req.params;
    try{
        const data = await metadataService.testMetadata(metaId);
        res.send({ data });
    }catch (error) { 

    }
};


const createExpectResponse = async (req, res) => {
  const {metaId} = req.params;
  const {response} = req.body;

  try{
      const data = await metadataService.createExpectResponse(metaId, response);
      res.status(200).send({ "meta_id" : metaId, "response_id" : data });
  }catch (error) { 
    res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
  
  module.exports = {
    getAllMetadatas,
    createMetadata,
    updateMetadata,
    deleteMetadata,
    testMetadata,
    createExpectResponse
  };
  
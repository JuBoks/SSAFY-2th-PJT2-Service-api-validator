const metadataService = require("../services/metadataService");


const createMetadata = async (req, res) => {
    
    try {
      //await apiService.deleteOneApi(apiId);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
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

  
  module.exports = {
    createMetadata,
    testMetadata,
  };
  
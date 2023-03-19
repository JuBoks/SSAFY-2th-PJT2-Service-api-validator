const metadata = require("../database/MetaData");
const api = require("../database/Api");
const domain = require("../database/Domain");
const axios = require("axios");

const testMetadata = async (metaId) => {

    const metadata_data = await metadata.getMetaData(metaId);
    const api_data = await api.getApi(metadata_data.api_id);
    const domain_data = await domain.getDomain(api_data.domain_id);


    const request = {};
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

}

module.exports = {testMetadata};
const metadataService = require("../services/metadataService");

const getAllMetadatas = async (req, res) => {
  const { body } = req;
  if (!body.api_id) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'api_id",
      },
    });
    return;
  }
  try {
    const allMetas = await metadataService.getAllMetadatas(body.api_id);
    res.send({ status: "OK", data: allMetas });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createMetadata = async (req, res) => {
  const {apiId} = req.params;
  const { body } = req;

  if (
    !body.header ||
    !body.params ||
    !body.body ||
    !body.cycle_time ||
    !body.name
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'header', 'params', 'body', 'cycle_time'",
      },
    });
    return;
  }
  const newMeta = {
    name: body.name,
    header: body.header,
    params: body.params,
    body: body.body,
    cycle_time: body.cycle_time,
  };
  try {
    const meta_id = await metadataService.createMetadata(apiId, newMeta);
    res.status(201).send({ status: "OK", "meta_id": meta_id });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateMetadata = async (req, res) => {
  const {
    body,
    params: { metaId },
  } = req;
  if (!metaId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':domainId' can not be empty" },
    });
  }
  try {
    const updatedMeta = await metadataService.updateMetadata(metaId, body);
    res.send({ status: "OK", data: updatedMeta });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteMetadata = async (req, res) => {
  const {
    params: { metaId },
  } = req;
  if (!metaId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':domainId' can not be empty" },
    });
  }
  try {
    await metadataService.deleteMetadata(metaId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const testMetadata = async (req, res) => {
  const { metaId } = req.params;
  try {
    const data = await metadataService.testMetadata(metaId);
    res.send({ data });
  } catch (error) {}
};

const createExpectResponse = async (req, res) => {
  const { metaId } = req.params;
  const { response } = req.body;

  try {
    const data = await metadataService.createExpectResponse(metaId, response);
    res.status(200).send({ meta_id: metaId, response_id: data });
  } catch (error) {
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
  createExpectResponse,
};

const metadataService = require("../services/metaDataService");

const createNewMetadata = async (req, res) => {
  const { body } = req;
  if (
    !body.api_id ||
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
          "One of the following keys is missing or is empty in request body: 'api_id', 'name', 'header', 'params', 'body', 'cycle_time'",
      },
    });
    return;
  }
  const newMeta = {
    api_id: body.api_id,
    name: body.name,
    header: body.header,
    params: body.params,
    body: body.body,
    cycle_time: body.cycle_time,
  };
  try {
    const createdMeta = await metadataService.createNewMetadata(newMeta);
    res.status(201).send({
      status: "OK",
      data: { meta_id: createdMeta.insertId, ...newMeta },
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

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

const getOneMetadata = async (req, res) => {
  const {
    params: { metaId },
  } = req;
  if (!metaId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':metaId' can not be empty" },
    });
  }
  try {
    const meta = await metadataService.getOneMetadata(metaId);
    res.send({ status: "OK", data: meta });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneMetadata = async (req, res) => {
  const {
    body,
    params: { metaId },
  } = req;
  if (!metaId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':metaId' can not be empty" },
    });
  }
  try {
    const updatedMeta = await metadataService.updateOneMetadata(metaId, body);
    res.send({ status: "OK", data: { meta_id: metaId, ...body } });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneMetadata = async (req, res) => {
  const {
    params: { metaId },
  } = req;
  if (!metaId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':metaId' can not be empty" },
    });
  }
  try {
    await metadataService.deleteOneMetadata(metaId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const testMetadata = async (req, res) => {
  const {
    params: { metaId },
  } = req;
  try {
    const data = await metadataService.testMetadata(metaId);
    res.send({ status: "OK", data });
  } catch (error) { }
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
  getOneMetadata,
  createNewMetadata,
  updateOneMetadata,
  deleteOneMetadata,
  testMetadata,
  createExpectResponse,
};

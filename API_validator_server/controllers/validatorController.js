const validatorService = require("../services/validatorService");

const getApiList = async (req, res) => {
  try {
    const data = await validatorService.getApiList();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createApiTestResult = async (req, res) => {
  const { body } = req;
  const { meta_id, action_id, response } = body;
  if (!meta_id || !action_id || !response) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'meta_id', 'action_id', 'response'",
      },
    });
    return;
  }
  try {
    const data = await validatorService.createApiTestResult(
      meta_id,
      action_id,
      response
    );
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createInferredSchema = (req, res) => {
  const { body } = req;
  if (!body.response) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'response'",
      },
    });
    return;
  }
  try {
    const data = validatorService.createInferredSchema(body.response);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createSchemaDiff = (req, res) => {
  const { body } = req;
  if (!body.source || !body.compare) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'source', 'compare",
      },
    });
    return;
  }
  try {
    const data = validatorService.createSchemaDiff(body.source, body.compare);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getApiList,
  createApiTestResult,
  createInferredSchema,
  createSchemaDiff,
};

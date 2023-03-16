const validatorService = require("../services/validatorService");

const helloWorld = (req, res) => {
  try {
    res.send({ status: "OK", data: "Hello World!" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getInferredSchema = (req, res) => {
  const { body } = req;
  /*
    body가 형식에 맞는지 예외처리
  */
  // 자료형 추론
  try {
    const schema = validatorService.inferSchema(body, Array.isArray(body));
    console.log(schema);
    res.status(201).send({ status: "OK", data: schema });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

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
  // console.log(meta_id);

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

const getApiDiff = (req, res) => {
  res.send("Get API Diff");
};

module.exports = {
  helloWorld,
  getInferredSchema,
  getApiList,
  createApiTestResult,
  getApiDiff,
};

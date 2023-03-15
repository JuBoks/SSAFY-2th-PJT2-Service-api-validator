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

const apiRequest = (req, res) => {
  res.send("API Request");
  
};

const apiSave = (req, res) => {
  const {body} = req;
  const {meta_id, action_id, response} = body;

  try {
    const result_id = validatorService.saveResult(meta_id, action_id, response);
    res.status(200).send({ result_id: result_id });
  }
  catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const apiDiff = (req, res) => {
  res.send("API Diff");
};

module.exports = {
  helloWorld,
  getInferredSchema,
  apiRequest,
  apiSave,
  apiDiff,
};

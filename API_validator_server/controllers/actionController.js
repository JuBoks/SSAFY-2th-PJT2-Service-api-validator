const actionService = require("../services/actionService");

const saveAction = (req, res) => {
  try {
    const action_id = actionService.saveAction();
    res
      .status(200)
      .send({ action_id: action_id });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateAction = (req, res) => {
  const { body } = req;

  try {
    const action_id = actionService.updateAction(body);
    res.status(200).send({ action_id: action_id });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};



module.exports = {
    saveAction,
  updateAction,
};

const actionService = require("../services/actionService");

const saveAction = async (req, res) => {
  try {
    const action_id = await actionService.saveAction();
    res
      .status(200)
      .send({ action_id: action_id });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateAction = async (req, res) => {
  const { action_id, pass, fail } = req.body;

  try {
    const res_action_id = await actionService.updateAction(action_id, pass, fail);

    //예외 처리. 해당 action_id 가 없을 경우
    if(res_action_id===-1) {
      res
      .status(204)
      .send({ status: "No Content", data: "action_id is wrong."  });
    }

    else res.status(200).send({ action_id: action_id });
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

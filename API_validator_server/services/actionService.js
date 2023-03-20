const action = require("../database/Action");

const saveAction = async () => {
  const action_id = await action.saveAction();

  return action_id;
};

const updateAction = async (body) => {
    const {action_id, pass, fail} = body;
    
    const action_id1 = await action.updateAction(action_id, pass, fail);
    
    return action_id1;
  };
  


module.exports = { saveAction, updateAction };

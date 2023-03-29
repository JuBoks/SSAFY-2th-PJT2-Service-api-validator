const action = require("../database/Action");
const pool = require("../database/utils");

const saveAction = async () => {
  const conn = await pool.getConnection();
  
  try {

    const action_id = await action.saveAction(conn);
  
    return action_id;
  }
  catch(error) {
    throw error;
  }

};

const updateAction = async (action_id, pass, fail) => {
    const conn = await pool.getConnection();

    try {
      const res_action_id = await action.updateAction(conn, action_id, pass, fail);

      return res_action_id;
    }
    catch(error) {
      throw error;
    }
    finally {
      conn.release();
    }
    
  };

const getActionsByDate = async (startTime, endTime) => {
    const conn = await pool.getConnection();
    
    try {
      const data = await action.getActionsByDate(conn, startTime, endTime);

      return data;
    }
    catch(error) {
      throw error;
    }
  
};


module.exports = { 
  saveAction, 
  updateAction, 
  getActionsByDate
};

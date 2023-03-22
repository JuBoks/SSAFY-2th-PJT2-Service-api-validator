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

const updateAction = async (body) => {
    const conn = await pool.getConnection();
    const {action_id, pass, fail} = body;
    try {
      const action_id1 = await action.updateAction(conn, action_id, pass, fail);

      return action_id1;
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

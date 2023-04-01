const action = require("../database/Action");
const pool = require("../database/utils");
const metadata = require("../database/MetaData");

const saveAction = async () => {
  const conn = await pool.getConnection();
  
  try {

    const action_id = await action.saveAction(conn);
  
    return action_id;
  }
  catch(error) {
    throw error;
  }
  finally {
    conn.commit();
    conn.release();
  }

};

const updateAction = async (action_id, pass, fail) => {
    const conn = await pool.getConnection();

    try {
      const metadatas_total = await metadata.getMetadatasCnt(conn);
      const unexcuted = metadatas_total - pass - fail;

      if(unexcuted < 0) throw new Error('pass, fail count are wrong.');

      const res_action_id = await action.updateAction(conn, action_id, pass, fail, unexcuted);

      return res_action_id;
    }
    catch(error) {
      throw error;
    }
    finally {
      conn.commit();
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
    finally {
      conn.release();
    }
};


module.exports = { 
  saveAction, 
  updateAction, 
  getActionsByDate
};

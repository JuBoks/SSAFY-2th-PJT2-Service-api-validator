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

const getActionsByDate = async (unit, cycle, startTime, endTime) => {
    const conn = await pool.getConnection();
    
    const result = {};

    let nowDate = new Date(startTime);
    let endDate = new Date(endTime);


    let interval = cycle*1;

    while ( nowDate <= endDate ) {
      let date = new Date(nowDate).toISOString().substring(0,10);
      result[date] = {count_date : new Date(nowDate).toISOString().substring(0,10), pass_cnt : 0, fail_cnt : 0, unexcuted_cnt : 0};

      if(unit=== "month") {
          nowDate.setMonth(nowDate.getMonth() + interval);
      }
      else if(unit === "week") {
          nowDate.setDate(nowDate.getDate() + interval*7 );
      }
      else if(unit === "day") {
          nowDate.setDate(nowDate.getDate() + interval); 
      }
    } 

    try {
      const data = await action.getActionsByDate(conn, startTime, endTime);
      let idx = 0;

      data.forEach((log) => {
          let date = new Date(log.created_at);
          date.setHours(date.getHours() + 9);
          
          let now_idx_date = new Date(Object.keys(result)[idx]);
          let next_idx_date = new Date(Object.keys(result)[idx+1]);

          while( date >= next_idx_date && idx < Object.keys(result).length ) {
            idx+=1;
            now_idx_date = new Date(Object.keys(result)[idx]);
              next_idx_date = new Date(Object.keys(result)[idx+1]);
          }

          const str_date = now_idx_date.toISOString().substring(0,10);
          
          result[str_date].pass_cnt += log.pass_cnt;
          result[str_date].fail_cnt += log.fail_cnt;
          result[str_date].unexcuted_cnt += log.unexcuted_cnt;
          
      })

      const entries = Object.values(result);

      return entries;
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

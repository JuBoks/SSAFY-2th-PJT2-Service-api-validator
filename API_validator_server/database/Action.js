/*
  data access layer
*/

const saveAction = async (conn) => {
  try {
    // action 저장 후 id 반환
    let sql = "INSERT INTO tbl_github_actions (pass_cnt, fail_cnt) values (0,0)";
    let [rows, fields] = await conn.query(sql);
    return rows.insertId;
  } catch (error) {
    return error;
  }
};

const updateAction = async (conn, action_id, pass, fail, unexcuted) => {
    try {
        // action 업데이트 후 id 반환
        let sql = "UPDATE tbl_github_actions SET pass_cnt=?, fail_cnt=?, unexcuted_cnt=? WHERE action_id = ?";
        let params = [pass, fail,unexcuted, action_id];
        let [rows, fields] = await conn.query(sql, params);
        if(rows.changedRows === 0) return -1;
        return action_id;
      } catch (error) {
        return error;
      }
};

const getActionsByDate = async (conn, startTime, endTime) => {
  try {
      // action 업데이트 후 id 반환
      let sql = `SELECT action_id, pass_cnt, fail_cnt, unexcuted_cnt, DATE_FORMAT(from_unixtime(created_at), '%Y-%m-%d %H:%i:%s') as 'created_at' FROM tbl_github_actions 
      WHERE created_at >= UNIX_TIMESTAMP(?) AND created_at <= UNIX_TIMESTAMP(?)`;
      let params = [startTime, endTime];
      let [rows, fields] = await conn.query(sql, params);

      return rows;
    } catch (error) {
      return error;
    }
};

module.exports = {
    saveAction,
    updateAction,
    getActionsByDate
};

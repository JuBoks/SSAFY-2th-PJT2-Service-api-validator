/*
  data access layer
*/
const { pool } = require("./utils");

const saveAction = async () => {
  try {
    // action 저장 후 id 반환
    let sql = "INSERT INTO tbl_github_actions (pass_cnt, fail_cnt) values (0,0)";
    let [rows, fields] = await pool.query(sql);
    return rows.insertId;
  } catch (error) {
    return error;
  }
};

const updateAction = async (action_id, pass, fail) => {
    try {
        // action 업데이트 후 id 반환
        let sql = "UPDATE tbl_github_actions SET pass_cnt=?, fail_cnt=? WHERE action_id = ?";
        let params = [pass, fail, action_id];
        let [rows, fields] = await pool.query(sql, params);
        console.log(rows);
        if(rows.changedRows === 0) return -1;
        return action_id;
      } catch (error) {
        return error;
      }
};

module.exports = {
    saveAction,
    updateAction,
};

const { pool } = require("./utils");

const getMetaData = async(metaId) => {
    try{
        let sql = "SELECT * FROM tbl_metadata WHERE meta_id = ?";
        let params = [metaId];
        let [rows, fields] = await pool.query(sql, params);
        return rows[0];
    }
    catch(error) {
        return error;
    }
}

module.exports =  {
    getMetaData
}
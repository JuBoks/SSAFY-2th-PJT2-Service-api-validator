const { pool } = require("./utils");

const getAllMetadatas = async(metaId) => {
    try{
        let sql = "SELECT * FROM tbl_metadata WHERE meta_id = ? AND state = 0";
        let params = [metaId];
        let [rows, fields] = await pool.query(sql, params);
        if(rows.length==0) throw new Error('No Content');
        return rows[0];
    }
    catch(error) {
        throw error;
    }
}


const getMetaData = async(metaId) => {
    try{
        let sql = "SELECT * FROM tbl_metadata WHERE meta_id = ? AND state = 0";
        let params = [metaId];
        let [rows, fields] = await pool.query(sql, params);
        if(rows.length==0) throw new Error('No Content');
        return rows[0];
    }
    catch(error) {
        throw error;
    }
}

const createMetadata = async(apiId, body) => {
    try{
        let sql = "INSERT INTO tbl_metadata (api_id, name, header, params, body, cycle_time) VALUES (?, ?, ?, ?, ?, ?)";
        let params = [apiId, body.name, JSON.stringify(body.header), JSON.stringify(body.params), JSON.stringify(body.body), body.cycle_time];
        let [rows, fields] = await pool.query(sql, params);
        return rows.insertId;
    }
    catch(error) {
        throw error;
    }
}


module.exports =  {
    getAllMetadatas,
    createMetadata,
    getMetaData
}
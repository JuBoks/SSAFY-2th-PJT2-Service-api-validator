

const getLogsByMetaId = async(conn, metaId ) => {
    try {
        let sql = `SELECT result.result_id as 'result_id', result.data_id as 'result_data_id', expect_response.data_id as 'expect_data_id', data.result_data as 'critic_schema', result.response as 'response', expect_response.response as 'critic_response', result.message as 'message', DATE_FORMAT(from_unixtime(result.created_at), '%Y-%m-%d %H:%i:%s') as 'created_at', result.result as 'result'
        FROM tbl_test_result as result 
        INNER JOIN tbl_expect_response_log as expect_response 
        ON result.response_id = expect_response.response_id
        INNER JOIN tbl_analyzed_data as data
        ON expect_response.data_id = data.data_id
        WHERE result.meta_id = ?`;
        let params = [metaId];
        let [rows, fields] = await conn.query(sql, params);

        return rows;
    }
    catch (error) {
        throw error;
    }
}

const getLogsByMetaIdAndDate = async(conn, metaId, startTime, endTime ) => {
    try {
        let sql = `SELECT result.result_id as 'result_id', result.data_id as 'result_data_id', expect_response.data_id as 'expect_data_id', data.result_data as 'critic_schema', result.response as 'response', expect_response.response as 'critic_response', result.message as 'message', DATE_FORMAT(from_unixtime(result.created_at), '%Y-%m-%d %H:%i:%s') as 'created_at', result.result as 'result'
        FROM tbl_test_result as result 
        INNER JOIN tbl_expect_response_log as expect_response 
        ON result.response_id = expect_response.response_id
        INNER JOIN tbl_analyzed_data as data
        ON expect_response.data_id = data.data_id
        WHERE result.meta_id = ? AND result.created_at >= UNIX_TIMESTAMP(?) AND result.created_at <= UNIX_TIMESTAMP(?)`;
        let params = [metaId, startTime, endTime];
        let [rows, fields] = await conn.query(sql, params);

        return rows;
    }
    catch (error) {
        throw error;
    }
}

const getDataById = async(conn, dataId) => {
    try {
        let sql = `SELECT * FROM tbl_analyzed_data WHERE data_id = ?`;
        let params = [dataId];
        let [rows, fields] = await conn.query(sql, params); 

        return rows[0];
    }
    catch (error) {
        throw error;
    }
}

const getLogByResultId = async(conn, resultId) => {
    try {
        let sql = `SELECT result.result_id as 'result_id', result.data_id as 'result_data_id', expect_response.data_id as 'expect_data_id', data.result_data as 'critic_schema', result.response as 'response', expect_response.response as 'critic_response', result.message as 'message', DATE_FORMAT(from_unixtime(result.created_at), '%Y-%m-%d %H:%i:%s') as 'created_at', result.result as 'result'
        FROM tbl_test_result as result 
        INNER JOIN tbl_expect_response_log as expect_response 
        ON result.response_id = expect_response.response_id
        INNER JOIN tbl_analyzed_data as data
        ON expect_response.data_id = data.data_id
        WHERE result.result_id = ?`;
        
        let params = [resultId];
        let [rows, fields] = await conn.query(sql, params);
        
        if(rows.length == 0 ) throw new Error("No Content");

        return rows[0];
    }
    catch (error) {
        throw error;
    }
}

const getResultByMetaId = async (conn, metaId, startTime, endTime) => {
    try {
        let sql = `SELECT result_id, result, DATE_FORMAT(from_unixtime(created_at), '%Y-%m-%d %H:%i:%s') as 'created_at' 
        FROM tbl_test_result WHERE meta_id = ? AND created_at >= UNIX_TIMESTAMP(?) AND created_at <= UNIX_TIMESTAMP(?)`;
        let params = [metaId, startTime, endTime];
        let [rows, fields] = await conn.query(sql, params);
        
        return rows;
    }
    catch(error) {
        throw error;
    }
}

const getResultByUserId = async (conn, userId, startTime, endTime) => {
    try {
        let sql = `SELECT result.result_id, result.result, DATE_FORMAT(from_unixtime(result.created_at), '%Y-%m-%d %H:%i:%s') as 'created_at' 
        FROM tbl_test_result as result
        INNER JOIN (
            SELECT meta_id FROM tbl_favorite_api
            WHERE user_id = ?
            ) as favorite
        ON result.meta_id = favorite.meta_id
        WHERE result.created_at >= UNIX_TIMESTAMP(?) AND result.created_at <= UNIX_TIMESTAMP(?)`;
        let params = [userId, startTime, endTime];
        let [rows, fields] = await conn.query(sql, params);
        return rows;
    }
    catch(error) {
        throw error;
    }
} 

module.exports = {
    getLogsByMetaId,
    getLogsByMetaIdAndDate,
    getDataById,
    getLogByResultId,
    getResultByMetaId,
    getResultByUserId
}
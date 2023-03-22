const testLog = require("../database/TestLog");
const pool = require("../database/utils");

const getLogsByMetaId = async (metaId, startTime, endTime) => {
    const conn = await pool.getConnection();

    try {
        let data;

        if(startTime != null && endTime != null) {
            data = await testLog.getLogsByMetaIdAndDate(conn, metaId, startTime, endTime);
        }
        else {
            data = await testLog.getLogsByMetaId(conn, metaId);
        }

        const answer = [];

        data.forEach(element => {
            let schema = "";
            if(element.result_data_id !== element.expect_data_id) {
                schema = testLog.getDataById(conn, element.result_data_id);
            }
            else schema = element.critic_schema;

            answer.push({
                result_id : element.result_id,
                content : {
                    response : element.response,
                    'critic-response' : element.critic_response,
                    schema : schema,
                    'critic-schema' : element.critic_schema,
                    result: element.result?true:false,
                },
                "created_at" : element.created_at,
            });
        });
        
        return answer;
        
    }
    catch(error) {
        throw error;
    }
    finally {
        conn.release();
    }

}

const getLogByResultId = async (resultId) => {
    const conn = await pool.getConnection();

    try {
        let data = await testLog.getLogByResultId(conn, resultId);

        let schema ="";
        if(data.result_data_id !== data.expect_data_id) {
            schema = testLog.getDataById(conn, data.result_data_id);
        }
        else {
            schema = data.critic_schema;
        }
        const answer = {
            result_id: data.result_id,
            content: {
                response: data.response,
                'critic-response' : data.critic_response,
                schema : schema,
                'critic-schema' : data.critic_schema,
                result: data.result?true:false,
            },
            "created_at" : data.created_at,
        };
        
        return answer;
        
    }
    catch(error) {
        throw error;
    }
    finally {
        conn.release();
    }
}

const getResultByMetaId = async (metaId, unit, cycle, startTime, endTime) => {
    const conn = await pool.getConnection();
    
    let interval = 0;
    if(unit === "month") {
        interval = cycle*30*1000*60*60*24;
    }
    else if(unit === "week") {
        interval = cycle*7*1000*60*60*24;
    }
    else if(unit === "day") {
        interval = cycle*1000*60*60*24;
    }
    else if(unit === "hour") {
        interval = cycle*1000*60*60;
    }
    
    try {
        let data = await testLog.getResultByMetaId(conn, metaId, startTime, endTime);

        console.log(data);

        let date = new Date(startTime);

        // data.forEach((element)=> {


        // });

        return data;
    }
    catch(error) {
        throw error;
    }
    finally {
        conn.release();
    }
}

module.exports = {
    getLogsByMetaId,
    getLogByResultId,
    getResultByMetaId
}
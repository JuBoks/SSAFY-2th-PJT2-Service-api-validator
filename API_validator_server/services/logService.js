const testLog = require("../database/TestLog");
const pool = require("../database/utils");

const getLogsByMetaId = async (metaId, startTime, endTime) => {
  const conn = await pool.getConnection();

  try {
    let data;

    if (startTime != null && endTime != null) {
      data = await testLog.getLogsByMetaIdAndDate(
        conn,
        metaId,
        startTime,
        endTime
      );
    } else {
      data = await testLog.getLogsByMetaId(conn, metaId);
    }

    const answer = [];
    for(const element of data) {
      let schema = "";
      
      if (element.result_data_id !== element.expect_data_id) {
        schema = await testLog.getDataById(conn, element.result_data_id);
        schema = schema.result_data;

      } else{
        schema = element.critic_schema;
      } 

      answer.push({
        result_id: element.result_id,
        content: {
          response: element.response,
          "critic-response": element.critic_response,
          schema: schema,
          "critic-schema": element.critic_schema,
          result: element.result ? true : false,
        },
        message: element.message,
        created_at: element.created_at,
      });
    }

    return answer;

  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const getLogByResultId = async (resultId) => {
  const conn = await pool.getConnection();

  try {
    let data = await testLog.getLogByResultId(conn, resultId);

    let schema = "";
    if (data.result_data_id !== data.expect_data_id) {
      schema = await testLog.getDataById(conn, data.result_data_id);
      schema = schema.result_data;
    } else {
      schema = data.critic_schema;
    }
    const answer = {
      result_id: data.result_id,
      content: {
        response: data.response,
        "critic-response": data.critic_response,
        schema: schema,
        "critic-schema": data.critic_schema,
        result: data.result ? true : false,
      },
      messsage: data.message,
      created_at: data.created_at,
    };

    return answer;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const getResultByUser = async (userId, unit, cycle, startTime, endTime) => {
  const conn = await pool.getConnection();
  const result = {};

  let nowDate = new Date(startTime);
  let endDate = new Date(endTime);

  let interval = cycle * 1;

  while (nowDate <= endDate) {
    let date = new Date(nowDate).toISOString().substring(0, 10);
    result[date] = {
      count_date: new Date(nowDate).toISOString().substring(0, 10),
      pass_cnt: 0,
      fail_cnt: 0,
    };

    if (unit === "month") {
      nowDate.setMonth(nowDate.getMonth() + interval);
    } else if (unit === "week") {
      nowDate.setDate(nowDate.getDate() + interval * 7);
    } else if (unit === "day") {
      nowDate.setDate(nowDate.getDate() + interval);
    }
  }

  try {
    let data = await testLog.getResultByUserId(
      conn,
      userId,
      startTime,
      endTime
    );
    let idx = 0;

    data.forEach((log) => {
      let date = new Date(log.created_at);
      date.setHours(date.getHours() + 9);

      let now_idx_date = new Date(Object.keys(result)[idx]);
      let next_idx_date = new Date(Object.keys(result)[idx + 1]);

      while (date >= next_idx_date && idx < Object.keys(result).length) {
        idx += 1;
        now_idx_date = new Date(Object.keys(result)[idx]);
        next_idx_date = new Date(Object.keys(result)[idx + 1]);
      }

      const str_date = now_idx_date.toISOString().substring(0, 10);

      if (log.result === 1) result[str_date].pass_cnt += 1;
      else result[str_date].fail_cnt += 1;
    });

    const entries = Object.values(result);

    return entries;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

const getResultByMetaId = async (metaId, unit, cycle, startTime, endTime) => {
  const conn = await pool.getConnection();
  const result = {};

  let nowDate = new Date(startTime);
  let endDate = new Date(endTime);

  let interval = cycle * 1;

  while (nowDate <= endDate) {
    let date = new Date(nowDate).toISOString().substring(0, 10);

    result[date] = {
      count_date: new Date(nowDate).toISOString().substring(0, 10),
      pass_cnt: 0,
      fail_cnt: 0,
    };

    if (unit === "month") {
      nowDate.setMonth(nowDate.getMonth() + interval);
    } else if (unit === "week") {
      nowDate.setDate(nowDate.getDate() + interval * 7);
    } else if (unit === "day") {
      nowDate.setDate(nowDate.getDate() + interval);
    }
  }

  try {
    let data = await testLog.getResultByMetaId(
      conn,
      metaId,
      startTime,
      endTime
    );
    let idx = 0;

    data.forEach((log) => {
      let date = new Date(log.created_at);
      date.setHours(date.getHours() + 9);

      let now_idx_date = new Date(Object.keys(result)[idx]);
      let next_idx_date = new Date(Object.keys(result)[idx + 1]);

      while (date >= next_idx_date && idx < Object.keys(result).length) {
        idx += 1;
        now_idx_date = new Date(Object.keys(result)[idx]);
        next_idx_date = new Date(Object.keys(result)[idx + 1]);
      }

      const str_date = now_idx_date.toISOString().substring(0, 10);

      if (log.result === 1) result[str_date].pass_cnt += 1;
      else result[str_date].fail_cnt += 1;
    });

    const entries = Object.values(result);

    return entries;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  getLogsByMetaId,
  getLogByResultId,
  getResultByUser,
  getResultByMetaId,
};

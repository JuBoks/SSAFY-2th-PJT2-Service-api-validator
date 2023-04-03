const Validator = require("../database/Validator");
const pool = require("../database/utils");
const extractRootSchema = require("../apiInference/extractRootSchema");
const compareSchema = require("../apiInference/compareSchema");
const axios = require("axios");
require("dotenv").config();

const isEmpty = (object) => {
  return Object.keys(object).length === 0;
};

const createApiTestResult = async (meta_id, action_id, response) => {
  const conn = await pool.getConnection();

  //response 자료형 추론하기
  const schema = extractRootSchema(response);
  const now_date = new Date().toISOString().substring(0,10);

  try {
    //트랜잭션 시작
    await conn.beginTransaction();

    //meta id 에 현재 기대 response 값이 있는지 확인한다.
    const expect_response = await Validator.getResponseByMetaId(conn, meta_id);

    let result = false;

    //자료형 추론 결과 저장
    let data_id = null;

    //에러 메시지
    let testMessage = null;

    //기대하는 값이 있으면, 정답지와 diff 비교, pass/fail 판단
    if (expect_response !== null) {
      //정답 스키마
      const answer_schema = await Validator.getAnalyzedDataByDataId(
        conn,
        expect_response.data_id
      );
      
      testMessage = compareSchema(schema, answer_schema);

      //메소드 호출
      result = isEmpty(testMessage);

      //만약 pass면,expect_response의 data_id 저장
      if (result) {
        data_id = expect_response.data_id;
      }

      //fail 이면 자료형 추론 결과 저장
      else {
        data_id = await Validator.createAnalyzedData(conn, schema);
      }
    } else {
      //정답지 없으면 예외처리
      throw new Error("No valid response answer.");
    }

    //las req time 업데이트
    await Validator.updateMetaRequestTime(conn, meta_id, now_date);

    const data = [
      meta_id,
      data_id,
      action_id,
      expect_response.response_id,
      JSON.stringify(response),
      result,
      (result)?null:JSON.stringify(testMessage)
    ];


    //테스트 테이블에 저장
    const result_id = await Validator.createTestResult(conn, data);

    //fail 이면 백엔드 서버에게 전송
    if(!result) {
      const pass = await submitErrorToWebServer(meta_id, result_id, now_date, testMessage);
    }

    await conn.commit();

    return { result_id: result_id, result: result };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

const submitErrorToWebServer = async (meta_id, result_id, now_date, errorMessage) => {
  await axios({
    url : process.env.BACKEND_SERVER+`/alerts/${meta_id}`,
    method : "post",
    headers : {chk : process.env.CHECK},
    data: {
      result_id : result_id,
	    time: now_date,
	    msg: JSON.stringify(errorMessage)
    }
  })
  .catch(error => {
    throw new Error("cannot post web backend server.");
  })
}

const getApiList = async () => {
  const conn = await pool.getConnection();
  try {
    //트랜잭션 시작
    await conn.beginTransaction();

    const allApis = await Validator.getApiList(conn);

    const result = allApis.reduce((acc, cur, idx) => {
      acc.push({
        meta_id: cur.meta_id,
        method: cur.method,
        baseURL: cur.domain,
        path: cur.resources,
        header: cur.header,
        params: cur.params,
        body: cur.body,
      });

      return acc;
    }, []);

    conn.commit();

    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = { getApiList, createApiTestResult };

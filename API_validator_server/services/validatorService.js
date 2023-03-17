const Validator = require("../database/Validator");

const inferSchema = (data, isArray) => {
  let schema = null;
  if (isArray) schema = [];
  else schema = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (value === null) {
        schema[key] = "null";
      } else if (Array.isArray(value)) {
        schema[key] = inferSchema(value.slice(0, 1), true);
      } else if (typeof value === "object") {
        schema[key] = inferSchema(value, Array.isArray(value)); // Recursively infer nested schema
      } else if (typeof value === "string") {
        schema[key] = "string";
      } else if (typeof value === "number") {
        schema[key] = "number";
      } else if (typeof value === "boolean") {
        schema[key] = "boolean";
      }
    }
  }
  return schema;
};

const compareJson = (data_1, data_2) => {
  const changes = {}; // 결과를 담을 Object
  const keys = new Set([...Object.keys(data_1), ...Object.keys(data_2)]); // 두 개의 JSON data에 있는 key를 추출
  for (const key of keys) {
    if (!(key in data_1)) {
      // 1. data_1에 키가 없을 때 (새로운 필드가 생성되었을 때)
      changes[key] = [null, data_2[key]];
    } else if (!(key in data_2)) {
      // 2. data_1에만 키가 있을 때 (필드가 삭제되었을 때)
      changes[key] = [data_1[key], null];
    } else if (data_1[key] !== data_2[key]) {
      // 3. 값(또는 자료형)이 다를 때
      if (typeof data_1[key] === "object" && typeof data_2[key] === "object") {
        // 3-1. 둘 다 Object라면 재귀적으로 검사
        const nested_changes = compareJson(data_1[key], data_2[key]);
        if (Object.keys(nested_changes).length > 0) {
          changes[key] = nested_changes;
        }
      } else {
        // 3-2. 둘의 값이 다를 때, 각각을 changes에 기록
        changes[key] = [data_1[key], data_2[key]];
      }
    }
  }
  return changes;
};

const isEmpty = (object) => {
  return Object.keys(object).length === 0;
};

//transaction 처리 필요. conn 을 service에서 가져오게?
const createApiTestResult = async (meta_id, action_id, response) => {
  //response 자료형 추론하기
  const schema = inferSchema(response, Array.isArray(response));
  // console.log(schema);

  //meta id 에 현재 기대 response 값이 있는지 확인한다.
  const expect_response = await Validator.getResponseByMetaId(meta_id);
  // console.log(expect_response.data_id);
  const answer_schema = await Validator.getAnalyzedDataByDataId(
    expect_response.data_id
  );

  let result = false;

  //자료형 추론 결과 저장
  let data_id = null;

  //기대하는 값이 있으면, 정답지와 diff 비교, pass/fail 판단
  if (expect_response !== null) {
    //메소드 호출
    result = isEmpty(compareJson(schema, answer_schema));

    //만약 pass면,expect_response의 data_id 저장
    if (result) {
      data_id = expect_response.data_id;
    }

    //fail 이면 자료형 추론 결과 저장
    else {
      data_id = await Validator.createAnalyzedData(schema);
    }
  } else {
    data_id = await Validator.createAnalyzedData(schema);
  }

  const data = [
    meta_id,
    data_id,
    action_id,
    expect_response.response_id,
    JSON.stringify(response),
    result,
  ];
  await Validator.updateMetaRequestTime(meta_id);
  //테스트 테이블에 저장
  const result_id = await Validator.createTestResult(data);
  return { result_id: result_id, result: result };
};

const getApiList = async () => {
  try {
    const allApis = await Validator.getApiList();
    const result = allApis.reduce((acc, cur, idx) => {
      acc.push({
        meta_id: cur.meta_id,
        method: cur.method,
        url: cur.domain + cur.resources,
        header: cur.header,
        params: cur.params,
        body: cur.body,
      });
      return acc;
    }, []);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getApiList, createApiTestResult };
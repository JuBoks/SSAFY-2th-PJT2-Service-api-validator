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

//transaction 처리 필요. conn 을 service에서 가져오게?
const saveResult = (meta_id, action_id, response) => {
  //response 자료형 추론하기
  const schema = inferSchema(response, Array.isArray(response));

  
  //meta id 에 현재 기대 response 값이 있는지 확인한다.
  const expect_response = Validator.getResponseByMetaId(meta_id);

  var result = false;

  //자료형 추론 결과 저장
  var data_id=null;

  //기대하는 값이 있으면, 정답지와 diff 비교, pass/fail 판단
  if(expect_response !== null) {
    //메소드 호출

    //만약 pass면,expect_response의 data_id 저장
    if(result){
      data_id = expect_response.data_id;
    }

    //fail 이면 자료형 추론 결과 저장
    else {
      data_id = validator.saveAnalyzedData(schema);
    }
  }
  else {
    data_id = validator.saveAnalyzedData(schema); 
  }

  const data = [
    meta_id, 
    data_id, 
    action_id, 
    expect_response.response_id, 
    response, 
    result
  ];

  
  //테스트 테이블에 저장
  const result_id = validator.saveTestResult(data);
  return result_id;
};


module.exports = { inferSchema, saveResult };

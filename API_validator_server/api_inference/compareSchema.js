const extractRootSchema = require("./inferSchema_v3");

// const fs = require("fs");
// let sample_data = JSON.parse(fs.readFileSync("../database/sample.json"));
// let sample_copy_data = JSON.parse(
//   fs.readFileSync("../database/sample_copy.json")
// );
// const schema = extractRootSchema(sample_data);
// const schema_copy = extractRootSchema(sample_copy_data);

const isEmpty = (object) => {
  return Object.keys(object).length === 0;
};

const compareRootSchema = (source, criteria) => {
  const primitiveSet = new Set(["string", "number", "null", "boolean"]);

  const compareSchema = (data_1, data_2, key) => {
    // 1. 둘 다 Array일 때
    // 있어도 되고 없어도 된다.
    // 다만, 있는 것들끼리는 일치해야한다.
    if (Array.isArray(data_1) && Array.isArray(data_2)) {
      // console.log("type 1");
      const common_elements = data_1.filter((value) => data_2.includes(value));
      common_elements.forEach((el) => {
        // 원시 자료형이면 (재귀적으로) 비교할 필요 없다
        if (primitiveSet.has(typeof el)) return;
        compareSchema(source[el], criteria[el], el);
      });
    }
    // 2. 둘 다 Object일 때
    // key가 둘 다 동일한 구성을 가져야하고,
    // value에는 자료형이 써있을텐데, 일치해야한다.
    else if (
      typeof data_1 === "object" &&
      !Array.isArray(data_1) &&
      typeof data_2 === "object" &&
      !Array.isArray(data_2)
    ) {
      const sub_change = {};
      const keys = new Set([...Object.keys(data_1), ...Object.keys(data_2)]);
      for (const sub_key of keys) {
        if (!(sub_key in data_1)) {
          // 1. data_1에 키가 없을 때 (새로운 필드가 생성되었을 때)
          sub_change[sub_key] = [null, data_2[sub_key]];
        } else if (!(sub_key in data_2)) {
          // 2. data_1에만 키가 있을 때 (필드가 삭제되었을 때)
          sub_change[sub_key] = [data_1[sub_key], null];
        } else if (data_1[sub_key] !== data_2[sub_key]) {
          // 3. 값(또는 자료형)이 다를 때
          sub_change[sub_key] = [data_1[sub_key], data_2[sub_key]];
        } else {
          // 4. 같은 자료형일때
          const data_type = data_1[sub_key];
          if (primitiveSet.has(data_type)) continue;
          compareSchema(source[data_type], criteria[data_type], data_type);
        }
      }
      if (isEmpty(sub_change)) return;
      // console.log("type 2");
      changes[key] = sub_change;
    }
    // 3. 단일 자료형으로 적혀있는데 (문자열로), 서로 다른 형태일때
    else if (typeof data_1 === "string" && typeof data_2 === "string") {
      // console.log("type 3");
      if (data_1 === data_2) return;
      changes[key] = [data_1, data_2];
    } else {
      // console.log("type 4");
      changes[key] = [data_1, data_2];
    }
  };

  const changes = {};

  // root부터 검사하기
  const source_schema = extractRootSchema(source);
  const criteria_schema = extractRootSchema(criteria);
  compareSchema(source_schema["root"], criteria_schema["root"], "root");

  return changes;
};

module.exports = compareRootSchema;

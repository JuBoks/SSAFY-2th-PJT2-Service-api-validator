const _ = require('underscore'); 

const extractRootSchema = (root) => {

  const arrayCheck = (data, isArray) => {
    let schema = null;
    if (isArray) schema = [];
    else schema = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (value === null) {
          schema[key] = null;
        } else if (Array.isArray(value)) {
          schema[key] = arrayCheck(value, true);
        } else if (typeof value === "object") {
          schema[key] = arrayCheck(value, false); // Recursively infer nested schema
        } else if (typeof value === "string") {
          schema[key] = "string";
        } else if (typeof value === "number") {
          schema[key] = "number";
        } else if (typeof value === "boolean") {
          schema[key] = "boolean";
        }
        
        if(isArray) {
          for(let i = 0; i< key; i++) {
            if(_.isEqual(schema[i], schema[key])) {
              schema.splice(key,1);
              break;
            }
          }
          schema  = schema.filter(function(item) {
            return item !== null;
           });
        }
      }
    }
    return schema;
  };

  const extractSchema = (data, prefix) => {
    // 0. data가 null일 경우
    if (data === null) {
      return "null";
    }
    // 1. data가 Array일 경우, Array를 구성하는 요소들의 schema 추론
    if (Array.isArray(data)) {
      const sub_schema = [];
      let idx =1;
      data.forEach((val) => {
        // 1-0. 요소가 Null일 때
        if (val === null) {
          sub_schema.push("null");
        }
        // 1-1. 요소가 Array 또는 Object일 때
        else if (typeof val === "object") {
          const keyName = `${prefix}_${idx++}`;
          const schema = extractSchema(val, keyName);
          meta_schema[keyName] = schema;
          sub_schema.push(keyName);

        }
        // 1-2. 요소가 원시자료형일 때
        else {
          const type = val;
          sub_schema.push(type);
        }
      });
      return sub_schema;
    }
    // 2. data가 Object일 경우 - 모든 key에 대한 value의 schema 추론
    else if (typeof data === "object") {
      const sub_schema = {};
      for (const [key, val] of Object.entries(data)) {
        // 2-0. 값이 null일 경우
        if (val === null) {
          sub_schema[key] = "null";
        }
        // 2-1. 값이 Array일 경우
        else if (Array.isArray(val)) {
          const keyName = `${prefix}_${key}`;
          const schema = extractSchema(val, keyName);
          sub_schema[key] = keyName;
          meta_schema[keyName] = schema;
        }
        // 2-2. 값이 Object일 경우
        else if (typeof val === "object") {
          const keyName = `${prefix}_${key}`;
          const schema = extractSchema(val, keyName);
          meta_schema[keyName] = schema;
          sub_schema[key] = keyName;
        } else {
          sub_schema[key] = val;
        }
      }
      return sub_schema;
    }
    // 3. data가 원시자료형일 경우
    else {
      return typeof data;
    }
  };

  const meta_schema = {};
  const root_schema = extractSchema(arrayCheck(root, Array.isArray(root)), "root");
  meta_schema["root"] = root_schema;

  return meta_schema;
};

module.exports = extractRootSchema;

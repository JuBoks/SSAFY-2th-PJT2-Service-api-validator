const extractRootSchema = (root) => {
  const getObjectCheck = (sub_schema, value) => {
    return sub_schema.find(
      (el) => JSON.stringify(meta_schema[el]) === JSON.stringify(value)
    );
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(
      (key) => JSON.stringify(object[key]) === JSON.stringify(value)
    );
  };

  const extractSchema = (data, prefix) => {
    // 0. data가 null일 경우
    if (data === null) {
      return "null";
    }
    // 1. data가 Array일 경우, Array를 구성하는 요소들의 schema 추론
    if (Array.isArray(data)) {
      const sub_schema = [];
      data.forEach((val, idx) => {
        // 1-0. 요소가 Null일 때
        if (val === null) {
          sub_schema.push("null");
        }
        // 1-1. 요소가 Array 또는 Object일 때
        else if (typeof val === "object") {
          const keyName = `${prefix}_${idx}`;
          const schema = extractSchema(val, keyName);
          const prevDefined = getObjectCheck(sub_schema, schema);
          // Array에 처음 등장한 자료형이라면 -> keyName만 sub_schema에 등록하고, 실제 schema정보는 meta_schema에 추론
          if (!prevDefined) {
            meta_schema[keyName] = schema;
            sub_schema.push(keyName);
          }
        }
        // 1-2. 요소가 원시자료형일 때
        else {
          const type = typeof val;
          const prevDefined = getKeyByValue(sub_schema, type);
          if (!prevDefined) {
            sub_schema.push(type);
          }
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
          sub_schema[key] = typeof val;
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
  const root_schema = extractSchema(root, "root");
  meta_schema["root"] = root_schema;

  return meta_schema;
};

module.exports = extractRootSchema;

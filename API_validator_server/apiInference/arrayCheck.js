const inferSchema = (data, isArray) => {
    let schema = null;
    if (isArray) schema = [];
    else schema = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (value === null) {
          schema[key] = null;
        } else if (Array.isArray(value)) {
          schema[key] = inferSchema(value, true);
        } else if (typeof value === "object") {
          schema[key] = inferSchema(value, false); // Recursively infer nested schema
        } else if (typeof value === "string") {
          schema[key] = "string";
        } else if (typeof value === "number") {
          schema[key] = "number";
        } else if (typeof value === "boolean") {
          schema[key] = "boolean";
        }
        
        if(isArray) {
          for(let i = 0; i< key; i++) {
            if(JSON.stringify(schema[i]) === JSON.stringify(schema[key])) {
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
  
  // 외부에 공유할 API 대입
  module.exports = inferSchema;
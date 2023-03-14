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

module.exports = { inferSchema };

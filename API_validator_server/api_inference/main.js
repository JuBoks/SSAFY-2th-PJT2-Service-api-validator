const extractRootSchema = require("../api_inference/inferSchema_v3");
const compareRootSchema = require("../api_inference/compareSchema");
const fs = require("fs");
let sample_data = JSON.parse(fs.readFileSync("./sample.json"));
let sample_copy_data = JSON.parse(fs.readFileSync("./sample_copy.json"));

const schema = extractRootSchema(sample_data);
const schema_copy = extractRootSchema(sample_copy_data);

// console.log(schema);
// console.log(schema_copy);

const result = compareRootSchema(schema, schema_copy);
console.log(result);

const validator = require("../database/Validator");

const dataConnect = (req, res) => {
    try {
        validator.get_users(function(result) {
            console.log(result);
            res.status(201).send({ status: "OK", data: result });
        });
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
  };
  
  
  module.exports = {
    dataConnect,
  };
  
const { pool } = require("./utils");

const getUser = async () => {
  try {
    const data = await pool.query("SELECT * FROM api_calls");
    if (data[0]) {
      return data[0];
    }
  } catch (error) {
    return error;
  }
};

module.exports = { getUser };

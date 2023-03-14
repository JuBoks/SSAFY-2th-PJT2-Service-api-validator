const dbTest = require("../database/DBTest");

const getUsers = async () => {
  try {
    const data = await dbTest.getUser();
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = { getUsers };

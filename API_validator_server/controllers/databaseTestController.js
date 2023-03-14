const dbTestService = require("../services/databaseTestService");

const dataConnect = async (req, res) => {
  try {
    const data = await dbTestService.getUsers();
    console.log(data);
    res.status(201).send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  dataConnect,
};

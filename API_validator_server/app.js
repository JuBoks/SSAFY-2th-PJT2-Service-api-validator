const express = require("express");
const bodyParser = require("body-parser");

const validatorRouter = require("./routes/validatorRoutes");
const sapivRouter = require("./routes/sapivRoutes");

const app = express();
const PORT = 3000; //서버 포트 번호

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/validator", validatorRouter);
app.use("/api", sapivRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

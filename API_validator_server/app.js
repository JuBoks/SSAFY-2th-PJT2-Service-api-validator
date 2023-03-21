const express = require("express");
const bodyParser = require("body-parser");

const validatorRouter = require("./routes/validatorRoutes");
const apiRouter = require("./routes/apiRoutes");

const app = express();
const PORT = 3000; //서버 포트 번호
const { swaggerUi, specs } = require("./swagger/swagger")

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/validator", validatorRouter);
app.use("/api", apiRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

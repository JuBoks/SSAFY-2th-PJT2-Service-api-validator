const express = require("express");
const bodyParser = require("body-parser");

const validatorRouter = require("./routes/validatorRoutes");
const apiRouter = require("./routes/apiRoutes");
const { authCheck } = require("./middleware/authCheck");


const app = express();
const PORT = 3000; //서버 포트 번호

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/validator",authCheck, validatorRouter);

app.use("/validator/web",authCheck, apiRouter);


app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");

const validatorRouter = require("./routes/validatorRoutes");

const app = express();
// const PORT = process.env.PORT || 3000;
const PORT = 3000; //서버 포트 번호

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/validator", validatorRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

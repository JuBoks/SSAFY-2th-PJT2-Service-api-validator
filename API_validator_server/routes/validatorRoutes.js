const express = require("express");
const validatorController = require("../controllers/validatorController");

//테스트를 위한 controller
const databaseTestController = require("../controllers/databaseTestController");

const router = express.Router();

router.get("/", validatorController.helloWorld);

router.post("/response", validatorController.getInferredSchema);

router.get("/api-list", validatorController.getApiList);

router.post("/api-test", validatorController.createApiTest);

router.get("/diff", validatorController.getApiDiff);

module.exports = router;

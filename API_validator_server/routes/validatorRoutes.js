const express = require("express");

const validatorController = require("../controllers/validatorController");
const actionController = require("../controllers/actionController");

const router = express.Router();

router.get("/api", validatorController.getApiList);

router.post("/api/test", validatorController.createApiTestResult);

router.post("/github-action", actionController.saveAction);

router.put("/github-action", actionController.updateAction);

module.exports = router;

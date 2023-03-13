const express = require("express");
const validatorController = require("../controllers/validatorController");

const router = express.Router();

router.get("/", validatorController.helloWorld);

router.post("/response", validatorController.getInferredSchema);

module.exports = router;

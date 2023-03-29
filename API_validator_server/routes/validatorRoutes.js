const express = require("express");

const validatorController = require("../controllers/validatorController");
const actionController = require("../controllers/actionController");

const {body} = require("express-validator");
const {validationCheck} = require("../middleware/validatorCheck");


const router = express.Router();

router.get("/api", validatorController.getApiList);

router.post("/api/test",
    body('meta_id').exists().isInt(),
    body('action_id').exists().isInt(),
    body('response').exists(),
    validationCheck, 
validatorController.createApiTestResult);

router.post("/github-action", actionController.saveAction);

router.put("/github-action", 
    body('action_id').exists().isInt(),
    body('pass').exists().isInt(),
    body('fail').exists().isInt(),
    validationCheck,
actionController.updateAction);

router.post("/schema-test", validatorController.getInferredSchema);

module.exports = router;

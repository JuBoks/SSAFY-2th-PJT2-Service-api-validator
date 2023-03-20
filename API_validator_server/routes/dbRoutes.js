const express = require("express");
//테스트를 위한 controller
const databaseTestController = require("../controllers/databaseTestController");

const router = express.Router();

router.get("/connect", databaseTestController.dataConnect);

module.exports = router;

const express = require("express");

const sapivController = require("../controllers/sapivController");

const router = express.Router();

router.post("/categories", sapivController.createNewCaterogy);

router.get("/categories", sapivController.getAllCategories);

router.get("/categories/:categoryId", sapivController.getOneCategory);

router.patch("/categories/:categoryId", sapivController.updateOneCategory);

router.delete("/categories/:categoryId", sapivController.deleteOneCategory);

module.exports = router;

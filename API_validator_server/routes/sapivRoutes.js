const express = require("express");

const sapivController = require("../controllers/sapivController");

const router = express.Router();

router.post("/categories", sapivController.createNewCategory);

router.get("/categories", sapivController.getAllCategories);

router.get("/categories/:categoryId", sapivController.getOneCategory);

router.patch("/categories/:categoryId", sapivController.updateOneCategory);

router.delete("/categories/:categoryId", sapivController.deleteOneCategory);

router.post("/domains", sapivController.createNewDomain);

router.get("/domains", sapivController.getAllDomains);

router.get("/domains/:domainId", sapivController.getOneDomain);

router.patch("/domains/:domainId", sapivController.updateOneDomain);

router.delete("/domains/:domainId", sapivController.deleteOneDomain);

module.exports = router;

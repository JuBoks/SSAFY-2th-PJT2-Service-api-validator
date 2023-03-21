const express = require("express");

const categoryController = require("../controllers/categoryController");
const domainController = require("../controllers/domainController");
const apiController = require("../controllers/apiController");
const metadataController = require("../controllers/metadataController");

const router = express.Router();

router.post("/categories", categoryController.createNewCategory);
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:categoryId", categoryController.getOneCategory);
router.patch("/categories/:categoryId", categoryController.updateOneCategory);
router.delete("/categories/:categoryId", categoryController.deleteOneCategory);

router.post("/domains", domainController.createNewDomain);
router.get("/domains", domainController.getAllDomains);
router.get("/domains/:domainId", domainController.getOneDomain);
router.patch("/domains/:domainId", domainController.updateOneDomain);
router.delete("/domains/:domainId", domainController.deleteOneDomain);

router.post("/apis", apiController.createNewApi);
router.get("/apis", apiController.getAllApis);
//router.get("/apis/:apiId", apiController.getOneApi);
router.patch("/apis/:apiId", apiController.updateOneApi);
router.delete("/apis/:apiId", apiController.deleteOneApi);

router.get("/apis/:apiId",metadataController.getAllMetadatas);
router.post("/apis/:apiId",metadataController.createMetadata);
router.put("/apis/:apiId/meta/:metaId",metadataController.updateMetadata);
router.delete("/apis/:apiId/meta/:metaId",metadataController.deleteMetadata);
router.post("/metadatas/:metaId/test",metadataController.testMetadata);
router.post("/metadatas/:metaId/expect",metadataController.createExpectResponse);

module.exports = router;

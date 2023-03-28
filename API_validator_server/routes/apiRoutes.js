const express = require("express");

const categoryController = require("../controllers/categoryController");
const domainController = require("../controllers/domainController");
const apiController = require("../controllers/apiController");
const metadataController = require("../controllers/metadataController");
const logController = require("../controllers/logController");

const {body, param, query} = require("express-validator");
const {validationCheck} = require("../middleware/validatorCheck");


const router = express.Router();

//categories

router.post("/categories", 
    body('name').exists(),
    body('note').exists(),
    validationCheck, 
  categoryController.createNewCategory);

  router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:categoryId",
    param('categoryId').exists().isInt(),
    validationCheck,
  categoryController.getOneCategory);

router.put("/categories/:categoryId",  
    param('categoryId').exists().isInt(),
    validationCheck, 
categoryController.updateOneCategory);

router.delete("/categories/:categoryId", 
    param('categoryId').exists().isInt(),
    validationCheck, 
categoryController.deleteOneCategory);

//domain

router.post("/domains", 
    body('name').exists(),
    body('domain').exists(),
    body('category_id').exists().isInt(),
    validationCheck, 
  domainController.createNewDomain);

router.get("/domains", domainController.getAllDomains);

router.get("/domains/:domainId",
    param('domainId').exists().isInt(),
    validationCheck,
  domainController.getOneDomain);

router.put("/domains/:domainId", 
    param('domainId').exists().isInt(),
    validationCheck,
domainController.updateOneDomain);

router.delete("/domains/:domainId", 
    param('domainId').exists().isInt(),
    validationCheck,
domainController.deleteOneDomain);


//api

router.post("/apis", 
    body('method').exists().isInt({min : 0, max: 3}),
    body('resources').exists(),
    body('domain_id').exists().isInt(),
    validationCheck, 
apiController.createNewApi);

router.get("/apis", apiController.getAllApis);

router.get("/apis/:apiId", 
    param('apiId').exists().isInt(),
    validationCheck, 
apiController.getOneApi);

router.put("/apis/:apiId", 
  param('apiId').exists().isInt(),
  validationCheck, 
apiController.updateOneApi);

router.delete("/apis/:apiId", 
  param('apiId').exists().isInt(),
  validationCheck, 
apiController.deleteOneApi);

//metatdata

router.post("/metadatas", [body('api_id').exists().isInt(), 
    body('header').exists(), 
    body('params').exists(), 
    body('body').exists(),
    body('cycle_time').exists().isInt(),
    body('name').exists().isString().isLength({min : 5, max : 20}) , 
    validationCheck ], metadataController.createNewMetadata);

router.get("/metadatas", [query('order').isInt().optional({nullable : true}), 
    query('column').isIn(['category', 'domain', 'api']).optional({nullable : true}),
    query('page_num').isInt().optional({nullable : true}),
    query('limit').isInt().optional({nullable : true}),
    query('search_value').isString().isLength({min : 1, max : 128}).optional({nullable : true}),
    query('search_option').isIn(['category', 'domain', 'api']).optional({nullable : true}),
    validationCheck], metadataController.getAllMetadatas);

router.get("/metadatas/:metaId", 
    param('metaId').exists().isInt(),
    validationCheck,
  metadataController.getOneMetadata);

router.put("/metadatas/:metaId",
  param('metaId').exists().isInt(),
  validationCheck,
 metadataController.updateOneMetadata);
 
router.delete("/metadatas/:metaId",
  param('metaId').exists().isInt(),
  validationCheck,
metadataController.deleteOneMetadata);

router.post("/metadatas/:metaId/test", 
  param('metaId').exists().isInt(),
  validationCheck,
metadataController.testMetadata);

router.post(
  "/metadatas/:metaId/expect",
  metadataController.createExpectResponse
);

//logs

router.get("/logs",
  query('metaId').exists().isInt(),
  query('startTime').exists(),
  query('endTime').exists(),
  validationCheck,
logController.getLogsByMetaId);

router.get("/logs/:resultId", 
  param('resultId').exists().isInt(),
  validationCheck,
  logController.getLogByResultId);

router.get("/logs/graph/action",
  query('startTime').exists(),
  query('endTime').exists(),
 logController.getResultByAction);

router.get("/logs/graph/metadatas/:metaId", 
  param('metaId').exists().isInt(),
  query('startTime').exists(),
  query('endTime').exists(),
  validationCheck,
logController.getResultByMetaId);

module.exports = router;

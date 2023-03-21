const express = require("express");

const categoryController = require("../controllers/categoryController");
const domainController = require("../controllers/domainController");
const apiController = require("../controllers/apiController");
const metadataController = require("../controllers/metadataController");

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   post:
 *    summary: "카테고리 등록"
 *    description: "Patch 방식을 통해 특정 유저 수정(단일 데이터를 수정할 때 사용함)"
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 유저 수정
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: "유저 이름"
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 수정)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: string
 *                  example:
 *                    [
 *                      { "id": 1, "name": "유저1" },
 *                      { "id": 2, "name": "유저2" },
 *                      { "id": 3, "name": "유저3" },
 *                    ]
 */
router.post("/categories", categoryController.createNewCategory);
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:categoryId", categoryController.getOneCategory);
router.put("/categories/:categoryId", categoryController.updateOneCategory);
router.delete("/categories/:categoryId", categoryController.deleteOneCategory);

router.post("/domains", domainController.createNewDomain);
router.get("/domains", domainController.getAllDomains);
router.get("/domains/:domainId", domainController.getOneDomain);
router.put("/domains/:domainId", domainController.updateOneDomain);
router.delete("/domains/:domainId", domainController.deleteOneDomain);

router.post("/apis", apiController.createNewApi);
router.get("/apis", apiController.getAllApis);
router.get("/apis/:apiId", apiController.getOneApi);
router.put("/apis/:apiId", apiController.updateOneApi);
router.delete("/apis/:apiId", apiController.deleteOneApi);

router.post("/metadatas", metadataController.createNewMetadata);
router.get("/metadatas", metadataController.getAllMetadatas);
router.get("/metadatas/:metaId", metadataController.getOneMetadata);
router.put("/metadatas/:metaId", metadataController.updateOneMetadata);
router.delete("/metadatas/:metaId", metadataController.deleteOneMetadata);
router.post("/metadatas/:metaId/test", metadataController.testMetadata);
router.post(
  "/metadatas/:metaId/expect",
  metadataController.createExpectResponse
);

module.exports = router;

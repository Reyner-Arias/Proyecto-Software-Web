const { Router } = require("express");
const router = Router();
const adminApplicationController = require("../controllers/admin-application.controller");
const token = require("../controllers/token");

router.post("/post", token.verifyToken, adminApplicationController.postApplication);
router.get("/get-all", token.verifyToken, adminApplicationController.getAll);
router.delete("/delete", token.verifyToken, adminApplicationController.deleteApplication);
router.post("/get-zip-file", token.verifyToken, adminApplicationController.getZipFile);

module.exports = router;
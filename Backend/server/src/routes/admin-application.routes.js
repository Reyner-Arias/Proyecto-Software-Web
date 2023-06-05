const { Router } = require("express");

const router = Router();
const adminApplicationController = require("../controllers/admin-application.controller");
const token = require("../controllers/token");

router.post("/post", adminApplicationController.postApplication);
router.get("/get-all", adminApplicationController.getAll);
router.delete("/delete", adminApplicationController.deleteApplication);
router.post("/get-zip-file", adminApplicationController.getZipFile);

module.exports = router;
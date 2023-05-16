const { Router } = require("express");

const router = Router();
const adminApplicationController = require("../controllers/admin-application.controller");
const token = require("../controllers/token");

/* 
* Cuando se inserte el token
* --------------------------
* router.post("/", token.verifyToken, adminVideogameController.postVideogame);
*/ 

router.post("/post", adminApplicationController.postApplication);
router.get("/get-all-titles", adminApplicationController.getAllTitles);
router.delete("/delete", adminApplicationController.deleteApplication);
router.post("/get-zip-file", adminApplicationController.getZipFile);

module.exports = router;
const { Router } = require("express");
const upload = require("../controllers/admin-videogames.controller");

const router = Router();
const adminVideogameController = require("../controllers/admin-videogames.controller");
const token = require("../controllers/token");

/* 
* Cuando se inserte el token
* --------------------------
* router.post("/", token.verifyToken, adminVideogameController.postVideogame);
*/ 

router.post("/post", adminVideogameController.postVideogame);
router.get("/get", adminVideogameController.getVideogame);
router.delete("/delete", adminVideogameController.deleteVideogame);
router.get("/get-zip-file", adminVideogameController.getZipFile);


module.exports = router;
const { Router } = require("express");

const router = Router();
const adminVideogameController = require("../controllers/admin-videogames.controller");
const token = require("../controllers/token");

/* 
* Cuando se inserte el token
* --------------------------
* router.post("/", token.verifyToken, adminVideogameController.postVideogame);
*/ 

router.post("/post", adminVideogameController.postVideogame);
router.get("/get", adminVideogameController.getVideogames);

// Obtener la cantidad de videojuegos con solo una etiqueta específica
router.get('/get-only-specific-tag-count/:tagId', adminVideogameController.countVideogamesWithOnlySpecificTag);

router.delete("/delete", adminVideogameController.deleteVideogame);
router.post("/get-zip-file", adminVideogameController.getZipFile);
router.put("/put", adminVideogameController.putVideogame);
router.delete("/delete-zip-file/:bucketId", adminVideogameController.deleteZipFile);

module.exports = router;
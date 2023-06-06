const { Router } = require("express");

const router = Router();
const adminVideogameController = require("../controllers/admin-videogames.controller");
const token = require("../controllers/token");

router.post("/post", token.verifyToken, adminVideogameController.postVideogame);
router.get("/get", token.verifyToken, adminVideogameController.getVideogames);

// Obtener la cantidad de videojuegos con solo una etiqueta específica
router.get('/get-only-specific-tag-count/:tagId', adminVideogameController.countVideogamesWithOnlySpecificTag);

router.delete("/delete", adminVideogameController.deleteVideogame);
router.post("/get-zip-file", adminVideogameController.getZipFile);
router.put("/put", adminVideogameController.putVideogame);
router.delete("/delete-zip-file/:bucketId", adminVideogameController.deleteZipFile);

module.exports = router;
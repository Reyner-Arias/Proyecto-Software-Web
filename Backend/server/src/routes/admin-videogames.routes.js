const { Router } = require("express");
const router = Router();
const adminVideogameController = require("../controllers/admin-videogames.controller");
const token = require("../controllers/token");

router.post("/post", token.verifyToken, adminVideogameController.postVideogame);
router.get("/get", token.verifyToken, adminVideogameController.getVideogames);

// Obtener la cantidad de videojuegos con solo una etiqueta específica
router.get('/get-only-specific-tag-count/:tagId', token.verifyToken, adminVideogameController.countVideogamesWithOnlySpecificTag);

router.delete("/delete", token.verifyToken, adminVideogameController.deleteVideogame);
router.post("/get-zip-file", token.verifyToken, adminVideogameController.getZipFile);
router.put("/put", token.verifyToken, adminVideogameController.putVideogame);
router.delete("/delete-zip-file/:bucketId", token.verifyToken, adminVideogameController.deleteZipFile);

module.exports = router;
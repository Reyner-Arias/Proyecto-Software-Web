const { Router } = require("express");
const router = Router();

const videogameTagController = require("../controllers/videogame-tag.controller");

// Crear una nueva relación
router.post('/post', videogameTagController.postVideogameTag);

// Verificar si la relación existe
router.get('/exists', videogameTagController.videogameTagExists);

module.exports = router
const { Router } = require("express");
const router = Router();

const videogameTagController = require("../controllers/videogame-tag.controller");

// Crear una nueva relación
router.post('/post', videogameTagController.postVideogameTag);

// Verificar si la relación existe
router.get('/exists/:videogame/:tag', videogameTagController.videogameTagExists);

// Obtener las relaciones asociadas a un videojuego
router.get('/get/:videogame', videogameTagController.getVideogameTags);

// Actualiza las relaciones videojuego-etiqueta
router.post('/update', videogameTagController.updateVideogameTag);

// Elimina las relaciones videojuego-etiqueta
router.delete('/delete/:videogame/:tag', videogameTagController.deleteVideogameTag);

// Elimina las relaciones por videojuego
router.delete('/delete-by-videogame/:videogame', videogameTagController.deleteVTagByVideogame);

// Elimina las relaciones por etiqueta
router.delete('/delete-by-tag/:tag', videogameTagController.deleteVideogameTByTag);

module.exports = router
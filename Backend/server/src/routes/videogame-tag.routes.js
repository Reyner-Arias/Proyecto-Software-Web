const { Router } = require("express");
const router = Router();

const videogameTagController = require("../controllers/videogame-tag.controller");
const token = require("../controllers/token");

// Crear una nueva relación videojuego-etiqueta
router.post('/post', videogameTagController.postVideogameTag);

// Verificar si existe la relación videojuego-etiqueta
router.get('/exists/:videogame/:tag', videogameTagController.videogameTagExists);

// Obtener las etiquetas de un videojuego
router.get('/get/:videogame', videogameTagController.getVideogameTags);

// Actualiza las relaciones videojuego-etiqueta de un videojuego
router.post('/update', videogameTagController.updateVideogameTag);

// Elimina una relación videojuego-etiqueta
router.delete('/delete/:videogame/:tag', videogameTagController.deleteVideogameTag);

// Elimina las relaciones videojuego-etiqueta por videojuego
router.delete('/delete-by-videogame/:videogame', videogameTagController.deleteVTagByVideogame);

// Elimina las relaciones videojuego-etiqueta por etiqueta
router.delete('/delete-by-tag/:tag', videogameTagController.deleteVideogameTByTag);

module.exports = router
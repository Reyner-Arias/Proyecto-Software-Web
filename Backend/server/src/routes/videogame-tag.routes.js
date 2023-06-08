const { Router } = require("express");
const router = Router();
const videogameTagController = require("../controllers/videogame-tag.controller");
const token = require("../controllers/token");

router.post('/post', token.verifyToken, videogameTagController.postVideogameTag);
router.get('/exists/:videogame/:tag', token.verifyToken, videogameTagController.videogameTagExists);
router.get('/get/:videogame', token.verifyToken, videogameTagController.getVideogameTags);
router.post('/update', token.verifyToken, videogameTagController.updateVideogameTag);
router.delete('/delete/:videogame/:tag', token.verifyToken, videogameTagController.deleteVideogameTag);
router.delete('/delete-by-videogame/:videogame', token.verifyToken, videogameTagController.deleteVTagByVideogame);
router.delete('/delete-by-tag/:tag', token.verifyToken, videogameTagController.deleteVideogameTByTag);

module.exports = router
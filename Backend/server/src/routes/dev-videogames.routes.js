const { Router } = require("express");
const router = Router();
const devVideogameController = require("../controllers/dev-videogames.controller");
const token = require("../controllers/token");

router.get("/get/:developer", token.verifyToken, devVideogameController.getVideogames);

module.exports = router;
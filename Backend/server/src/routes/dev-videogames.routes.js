const { Router } = require("express");
const router = Router();

const devVideogameController = require("../controllers/dev-videogames.controller");
const token = require("../controllers/token");

/* 
* Cuando se inserte el token
* --------------------------
* router.post("/", token.verifyToken, devVideogameController.getVideogames);
*/

router.get("/get/:developer", devVideogameController.getVideogames);

module.exports = router;
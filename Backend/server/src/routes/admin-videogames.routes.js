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
router.get("/getByDeveloper", adminVideogameController.getVideogamesByDeveloper);

module.exports = router;
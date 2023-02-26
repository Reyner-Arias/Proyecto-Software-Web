const adminVideogameController = {};

const Videojuego = require("../models/videogame");
const fs = require('fs')

//Funciones
adminVideogameController.postVideogame = async function (req, res) {
  req.body.portada.data = fs.readFileSync(req.body.imagepath)
  req.body.juegoZip.data = fs.readFileSync(req.body.filepath)
  const videojuego = new Videojuego(req.body)
  await videojuego.save();
  res.send("Videogame posted successfully");
}

module.exports = adminVideogameController;
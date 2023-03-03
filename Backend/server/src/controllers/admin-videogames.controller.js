const adminVideogameController = {};

const Videojuego = require("../models/videogame");
const path = require("path")
const mongodb = require("mongodb")

const fs = require('fs')

//Funciones
adminVideogameController.postVideogame = async function (req, res) {
  req.body.portada.data = fs.readFileSync(req.body.imagepath)
  req.body.juegoZip.data = fs.readFileSync(req.body.filepath)
  if (path.extname(req.body.filepath) == ".zip"){
    if (path.extname(req.body.imagepath) == ".png" || path.extname(req.body.imagepath) == ".jpg" || path.extname(req.body.imagepath) == ".jpeg"){
      const videojuego = new Videojuego(req.body)
      await videojuego.save();
      res.send("Videogame posted successfully");
    }else{
      res.send("Image file must be jpg, jpeg or png");
    }
  }else{
    res.send("Game file must be a zip file");
  }
}

adminVideogameController.getVideogame = async function (req,res) {
  const videojuegosEncontrados = await Videojuego.find({
    usuario: req.body.usuario
  })
  console.log(videojuegosEncontrados)
  res.send(videojuegosEncontrados)
}

adminVideogameController.deleteVideogame = async function (req,res) {
  const videojuegoEncontrado = await Videojuego.findByIdAndDelete({
    _id: new mongodb.ObjectId(req.body._id)
  })
  res.send("Videogame deleted successfully")
}

module.exports = adminVideogameController
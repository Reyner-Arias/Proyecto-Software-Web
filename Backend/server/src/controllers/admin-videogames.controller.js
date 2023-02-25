const express = require('express')
const { Router } = require("express");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()
const router = Router();
const multer = require("multer")
const {subirArchivo, obtenerArchivo} = require('./s3')

const adminVideogameController = {};

const Videojuego = require("../models/videogame");

//storage
const storage = multer.diskStorage({
  destination: "client/public/assets/images",
  filename: (req, file, callback, filename) => {
    var ext = path.extname(file.originalname);
    try {
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' ) {
        throw new Error(" no es una imagen \n")
      }
      callback(null, uuidv4() + ext);
    } catch (error) {
      console.log("El archivo selecionado" + error.name + "Solo se admiten archivos tipo: \n .png \n .jpg \n .gif \n .jpeg")
    }
  }
}) 

var subida = multer({storage})
router.use(express.static(__dirname));
router.use(jsonParser);

router.get('/imagen/:key', (req, res) => {
  const key = req.params.key;
  const readStream = obtenerArchivo(key);
  readStream.pipe(res);
})

//Funciones

adminVideogameController.subirVideojuego = subida.single('imagen'), async function (req, res) {
  try{
      const result = await subirArchivo(req.file);
      const videojuego = new Videojuego({
          id: Number(req.body.id),
          titulo: req.body.titulo,
          portada: result.Key,
          sinopsis: req.body.sinopsis,
          usuario: req.body.usuario,
          juegoZip: result.Key,
      })
      await videojuego.save();
      res.send("Videogame posted successfully");
  } catch (err){
      res.send(err);
  }
}


adminVideogameController.postVideogame = async (req, res) => {
  const newVideogame = new Videojuego(req.body);
  await newVideogame.save();
  res.send("Videogame posted successfully");
};

module.exports = adminVideogameController;
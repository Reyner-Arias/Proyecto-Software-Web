const adminVideogameController = {};

const Videojuego = require("../models/videogame");
const path = require("path")
const mongodb = require("mongodb")

const fs = require('fs')

function isValidImageExtension(imagepath) {
  switch (path.extname(imagepath)) {
    case '.png': return true;
    case '.jpg': return true;
    case '.jpeg': return true;
    default: return false;
  }
}

function getImageType(imagepath) {
  switch (path.extname(imagepath)) {
    case '.png': return 'image/png';
    case '.jpg': return 'image/jpg';
    case '.jpeg': return 'image/jpeg';
    default: return 'a';
  }
}

//Funciones
adminVideogameController.postVideogame = async function (req, res) {
  if (path.extname(req.body.filepath) == ".zip") {
    if (isValidImageExtension(req.body.imagepath) && isValidImageExtension(req.body.facepath) 
      && isValidImageExtension(req.body.instapath) && isValidImageExtension(req.body.twitterpath)) {
      
      req.body.portada.data = fs.readFileSync(req.body.imagepath)
      req.body.juegoZip.data = fs.readFileSync(req.body.filepath)
      req.body.facebook.data = fs.readFileSync(req.body.facepath)
      req.body.instagram.data = fs.readFileSync(req.body.instapath)
      req.body.twitter.data = fs.readFileSync(req.body.twitterpath)
      
      const videojuego = new Videojuego(req.body)
      await videojuego.save();
      res.send("Videogame posted successfully");
    } else {
      res.send("Image file must be jpg, jpeg or png");
    }
  } else {
    res.send("Game file must be a zip file");
  }
}

adminVideogameController.getVideogame = async function (req, res) {
  const videojuegosEncontrados = await Videojuego.find(
    {},{_id: 1})
  console.log(videojuegosEncontrados)
  res.send(videojuegosEncontrados)
}

adminVideogameController.deleteVideogame = async function (req, res) {
  await Videojuego.findByIdAndDelete({
    _id: new mongodb.ObjectId(req.body._id)
  })
  res.send("Videogame deleted successfully")
}

// Actualizar un videojuego
adminVideogameController.putVideogame = async (req, res) => {
  var updatedFields = {};

  /* if(req.body.filepath) {} */

  if(req.body.imagepath) {
    if (isValidImageExtension(req.body.imagepath)) {
      Object.assign(updatedFields, { portada: {tipoImagen: getImageType(req.body.imagepath), 
        data: fs.readFileSync(req.body.imagepath)} });
    } else {
      res.status(500).json({ error: 'Image file must be jpg, jpeg or png' });
    }
  }

  if(req.body.facepath) {
    if (isValidImageExtension(req.body.facepath)) {
      Object.assign(updatedFields, { facebook: {tipoImagen: getImageType(req.body.facepath), 
        data: fs.readFileSync(req.body.facepath)} });
    } else {
      res.status(500).json({ error: 'Image file must be jpg, jpeg or png' });
    }
  }

  if(req.body.instapath) {
    if (isValidImageExtension(req.body.instapath)) {
      Object.assign(updatedFields, { instagram: {tipoImagen: getImageType(req.body.instapath), 
        data: fs.readFileSync(req.body.instapath)} });
    } else {
      res.status(500).json({ error: 'Image file must be jpg, jpeg or png' });
    }
  }

  if(req.body.twitterpath) {
    if (isValidImageExtension(req.body.twitterpath)) {
      Object.assign(updatedFields, { twitter: {tipoImagen: getImageType(req.body.twitterpath), 
        data: fs.readFileSync(req.body.twitterpath)} });
    } else {
      res.status(500).json({ error: 'Image file must be jpg, jpeg or png' });
    }
  }

  Object.assign(updatedFields, {titulo: req.body.titulo, sinopsis: req.body.sinopsis, usuario: req.body.usuario});
  var updatedFieldsSet =  { $set: updatedFields };

  Videojuego.findOneAndUpdate({ _id: req.body._id }, updatedFieldsSet, (err, videogame) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!videogame) {
      res.status(404).json({ message: 'Videogame not found' });
    } else {
      res.status(200).json({ message: 'Videogame updated' });
    }
  })
};

module.exports = adminVideogameController
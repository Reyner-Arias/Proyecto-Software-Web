const adminVideogameController = {};

const Videojuego = require("../models/videogame");
const path = require("path");
const mongodb = require("mongodb");
const fs = require("fs");

const MongoClient = require('mongodb').MongoClient;
const GridFSBucket = require('mongodb').GridFSBucket;
const uri = 'mongodb+srv://excalinest:AcWqA5Ez6LNGUiKF@excalinestcluster.auytmua.mongodb.net/ExcalinestDB?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  if (err) throw err;
  console.log('Connected to MongoDB');
});

const db = client.db('ExcalinestDB');
const bucket = new GridFSBucket(db, { bucketName: 'builds' });

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

// Crear un nuevo videojuego
adminVideogameController.postVideogame = async function (req, res) {
  if (path.extname(req.body.filepath) == ".zip") {
    if (isValidImageExtension(req.body.imagepath) && isValidImageExtension(req.body.facepath) 
      && isValidImageExtension(req.body.instapath) && isValidImageExtension(req.body.twitterpath)) {
      
      if(req.body.imagepath) {
        if(fs.existsSync(req.body.imagepath)){
          req.body.portada.data = fs.readFileSync(req.body.imagepath)
        }else{
          return res.status(404).json('Image file for cover not found.');
        }
      }

      if(req.body.filepath) {
        if(fs.existsSync(req.body.filepath)){
          req.body.juegoZip.data = null;
        }else{
          return res.status(404).json('Zip file not found.');
        }
      }

      if(req.body.facepath) {
        if(fs.existsSync(req.body.facepath)){
          req.body.facebook.data = fs.readFileSync(req.body.facepath)
        }else{
          return res.status(404).json('Image file for facebook QR not found.');
        }
      }

      if(req.body.instapath) {
        if(fs.existsSync(req.body.instapath)){
          req.body.instagram.data = fs.readFileSync(req.body.instapath)
        }else{
          return res.status(404).json('Image file for Instagram QR not found.');
        }
      }
      
      if(req.body.twitterpath) {
        if(fs.existsSync(req.body.twitterpath)){
          req.body.twitter.data = fs.readFileSync(req.body.twitterpath)
        }else{
          return res.status(404).json('Image file for Twitter QR not found.');
        }
      }
      
      const readStream = fs.createReadStream(req.body.filepath);

      const uploadStream = bucket.openUploadStream(req.body.titulo + '.zip', {
        contentType: req.body.tipoArchivo
      });
      readStream.pipe(uploadStream);
      uploadStream.on('finish', async () => {
        console.log('File uploaded to MongoDB');
        const videojuego = new Videojuego(req.body)
        await videojuego.save();
        res.send("Videogame posted successfully");
      });
    } else {
      res.status(500).json({ error: 'Image file must be jpg, jpeg or png' });
    }
  } else {
    res.status(500).json({ error: 'Game file must be a zip file' });
  }
}

// Obtener todos los videojuegos
adminVideogameController.getVideogame = async function (req, res) {
  Videojuego.find({}, (err, videogames) => {
    if (err) {
      res.status(500).json(err.message)
    } else {
      res.status(200).send(videogames)
    }
  })
}

// Eliminar un videojuego
adminVideogameController.deleteVideogame = async function (req, res) {
  Videojuego.findByIdAndDelete({ _id: new mongodb.ObjectId(req.body._id) }, (err, videogame) => {
    if (err) {
      res.status(500).json(err.message)
    } else if (!videogame) {
      res.status(404).json('Videogame not found')
    } else {
      res.status(200).json('Videogame deleted successfully')
    }
  })
}

// Actualizar un videojuego
adminVideogameController.putVideogame = async (req, res) => {
  var updatedFields = {};

  if(req.body.filepath) {
    if(path.extname(req.body.filepath) == ".zip") {
      console.log("Upload new file");
    } else {
      return res.status(500).json('Game file must be a zip file');
    }
  }

  if(req.body.imagepath) {
    if (isValidImageExtension(req.body.imagepath)) {
      if(fs.existsSync(req.body.imagepath)) {
        Object.assign(updatedFields, { portada: {tipoImagen: getImageType(req.body.imagepath), 
          data: fs.readFileSync(req.body.imagepath)} });
      } else {
        return res.status(404).json('Image file not found.');
      }
    } else {
      return res.status(500).json('Image file must be jpg, jpeg or png');
    }
  }

  if(req.body.facepath) {
    if (isValidImageExtension(req.body.facepath)) {
      if(fs.existsSync(req.body.facepath)) {
        Object.assign(updatedFields, { facebook: {tipoImagen: getImageType(req.body.facepath), 
          data: fs.readFileSync(req.body.facepath)} });
      } else {
        return res.status(404).json('Image file not found.');
      }
    } else {
      return res.status(500).json('Image file must be jpg, jpeg or png');
    }
  }

  if(req.body.instapath) {
    if (isValidImageExtension(req.body.instapath)) {
      if(fs.existsSync(req.body.instapath)) {
        Object.assign(updatedFields, { instagram: {tipoImagen: getImageType(req.body.instapath), 
          data: fs.readFileSync(req.body.instapath)} });
      } else {
        return res.status(404).json('Image file not found.');
      }
    } else {
      return res.status(500).json('Image file must be jpg, jpeg or png');
    }
  }

  if(req.body.twitterpath) {
    if (isValidImageExtension(req.body.twitterpath)) {
      if(fs.existsSync(req.body.twitterpath)) {
        Object.assign(updatedFields, { twitter: {tipoImagen: getImageType(req.body.twitterpath), 
          data: fs.readFileSync(req.body.twitterpath)} });
      } else {
        return res.status(404).json('Image file not found.');
      }
    } else {
      return res.status(500).json('Image file must be jpg, jpeg or png');
    }
  }

  if(req.body.tags.length == 0) {
    return res.status(404).json('Tags not found.');
  }

  Object.assign(updatedFields, {titulo: req.body.titulo, sinopsis: req.body.sinopsis, 
    usuario: req.body.usuario, tags: req.body.tags});
  var updatedFieldsSet =  { $set: updatedFields };

  Videojuego.findOneAndUpdate({ _id: req.body._id }, updatedFieldsSet, (err, videogame) => {
    if (err) {
      return res.status(500).json(err.message);
    } else if (!videogame) {
      return res.status(404).json('Videogame not found');
    } else {
      return res.status(200).json('Videogame updated');
    }
  })
};

module.exports = adminVideogameController
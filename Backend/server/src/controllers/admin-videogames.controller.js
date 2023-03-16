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

      delete req.body._id;
      
      if(req.body.imagepath) {
        if(fs.existsSync(req.body.imagepath)){
          req.body.portada.data = fs.readFileSync(req.body.imagepath)
        }else{
          return res.status(404).json('Error: No se encontró la imagen de portada.');
        }
      }

      if(req.body.filepath) {
        if(fs.existsSync(req.body.filepath)){
          req.body.juegoZip.data = null;
        }else{
          return res.status(404).json('Error: No se encontró el archivo zip.');
        }
      }

      if(req.body.facepath) {
        if(fs.existsSync(req.body.facepath)){
          req.body.facebook.data = fs.readFileSync(req.body.facepath)
        }else{
          return res.status(404).json('Error: No se encontró la imagen del código QR de Facebook.');
        }
      }

      if(req.body.instapath) {
        if(fs.existsSync(req.body.instapath)){
          req.body.instagram.data = fs.readFileSync(req.body.instapath)
        }else{
          return res.status(404).json('Error: No se encontró la imagen del código QR de Instagram.');
        }
      }
      
      if(req.body.twitterpath) {
        if(fs.existsSync(req.body.twitterpath)){
          req.body.twitter.data = fs.readFileSync(req.body.twitterpath)
        }else{
          return res.status(404).json('Error: No se encontró la imagen del código QR de Twitter.');
        }
      }
      
      const readStream = fs.createReadStream(req.body.filepath);
      const uploadStream = bucket.openUploadStream(req.body.titulo + '.zip', {
        contentType: req.body.tipoArchivo
      });
      readStream.pipe(uploadStream);

      uploadStream
      .on('error', function (error) {
        res.status(500).send("Error al subir el archivo zip: " + error);
      })
      .on('finish', async () => {
        const videojuego = new Videojuego(req.body)
        await videojuego.save((err) => {
          if (err) {
            if (err.code === 11000) {
              res.status(422).send('Error: El videojuego ya existe, cambiar el título.');
            } else {
              res.status(500).json(err.message)
            }
          } else {
            res.status(201).json('El videojuego se ha creado correctamente.')
          }
        });
      });

    } else {
      res.status(500).json('Error: El formato de la imagen debe ser jpg, png o jpeg.');
    }
  } else {
    res.status(500).json('Error: El archivo del videojuego debe ser un zip.');
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
      res.status(404).json('Error: No se ha encontrado el videojuego.')
    } else {
      res.status(200).json('El videojuego se ha eliminado correctamente.')
    }
  })
}

// Actualizar un videojuego
adminVideogameController.putVideogame = async (req, res) => {
  var updatedFields = {};

  if(req.body.filepath) {
    if(path.extname(req.body.filepath) != ".zip") {
      return res.status(500).json('Error: El archivo del videojuego debe ser un zip.');
    }
  }

  if(req.body.imagepath) {
    if (isValidImageExtension(req.body.imagepath)) {
      if(fs.existsSync(req.body.imagepath)) {
        Object.assign(updatedFields, { portada: {tipoImagen: getImageType(req.body.imagepath), 
          data: fs.readFileSync(req.body.imagepath)} });
      } else {
        return res.status(404).json('Error: No se ha encontrado la imagen de portada.');
      }
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(req.body.facepath) {
    if (isValidImageExtension(req.body.facepath)) {
      if(fs.existsSync(req.body.facepath)) {
        Object.assign(updatedFields, { facebook: {tipoImagen: getImageType(req.body.facepath), 
          data: fs.readFileSync(req.body.facepath)} });
      } else {
        return res.status(404).json('Error: No se ha encontrado la imagen del código QR de Facebook.');
      }
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(req.body.instapath) {
    if (isValidImageExtension(req.body.instapath)) {
      if(fs.existsSync(req.body.instapath)) {
        Object.assign(updatedFields, { instagram: {tipoImagen: getImageType(req.body.instapath), 
          data: fs.readFileSync(req.body.instapath)} });
      } else {
        return res.status(404).json('Error: No se ha encontrado la imagen del código QR de Instagram.');
      }
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(req.body.twitterpath) {
    if (isValidImageExtension(req.body.twitterpath)) {
      if(fs.existsSync(req.body.twitterpath)) {
        Object.assign(updatedFields, { twitter: {tipoImagen: getImageType(req.body.twitterpath), 
          data: fs.readFileSync(req.body.twitterpath)} });
      } else {
        return res.status(404).json('Error: No se ha encontrado la imagen del código QR de Twitter.');
      }
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(req.body.tags.length == 0) {
    return res.status(404).json('Error: No se encontraron etiquetas.');
  }

  Object.assign(updatedFields, {titulo: req.body.titulo, sinopsis: req.body.sinopsis, 
    usuario: req.body.usuario, tags: req.body.tags});
  var updatedFieldsSet =  { $set: updatedFields };

  Videojuego.findOneAndUpdate({ _id: req.body._id }, updatedFieldsSet, (err, videogame) => {
    if (err) {
      return res.status(500).json(err.message);
    } else if (!videogame) {
      return res.status(404).json('Error: No se encontró el videojuego.');
    } else {
      return res.status(200).json('El videojuego se ha actualizado correctamente.');
    }
  })
};

// Descargar un videojuego archivo zip
adminVideogameController.getZipFile = async function (req,res) {
  const writeStream = fs.createWriteStream(req.body.destPath + req.body.filename);
  const downloadStream = bucket.openDownloadStreamByName(req.body.filename)
    .on('error', function (error) {
      if (error.name === 'MongoRuntimeError' && error.message.includes('FileNotFound')) {
        return res.status(404).send("Error: No se encontró el archivo zip.");
      } else {
        return res.status(500).send("Error al descargar el archivo zip: " + error);
      }
    });

  downloadStream.pipe(writeStream)
  .on('error', function (error) {
    return res.status(500).send("Error al descargar el archivo zip: " + error);
  })
  .on('finish', function () {
    return res.status(200).send("Archivo descargado.");
  });
}

module.exports = adminVideogameController
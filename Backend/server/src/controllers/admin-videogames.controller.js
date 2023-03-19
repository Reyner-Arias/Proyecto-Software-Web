const adminVideogameController = {};

const Videojuego = require("../models/videogame");
const path = require("path");
const mongodb = require("mongodb");
const fs = require("fs");
const mongoose = require("../database");

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

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection closed');
    process.exit(0);
  })
});

function isValidImageExtension(imagepath) {
  switch (path.extname(imagepath)) {
    case '.png': return true;
    case '.jpg': return true;
    case '.jpeg': return true;
    default: return false;
  }
}

function getImageExtension(imagepath) {
  switch (path.extname(imagepath)) {
    case '.png': return 'image/png';
    case '.jpg': return 'image/jpg';
    case '.jpeg': return 'image/jpeg';
    default: return '';
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
          req.body.portada.tipoImagen = getImageExtension(req.body.imagepath)
          req.body.portada.data = fs.readFileSync(req.body.imagepath)
        }else{
          return res.status(500).json('Error: No se encontró la imagen de portada.');
        }
      }

      if(req.body.filepath) {
        if(!fs.existsSync(req.body.filepath)){
          return res.status(500).json('Error: No se encontró el archivo zip.');
        }
      }

      if(req.body.facepath) {
        if(fs.existsSync(req.body.facepath)){
          req.body.facebook.tipoImagen = getImageExtension(req.body.imagepath)
          req.body.facebook.data = fs.readFileSync(req.body.facepath)
        }else{
          return res.status(500).json('Error: No se encontró la imagen del código QR de Facebook.');
        }
      }

      if(req.body.instapath) {
        if(fs.existsSync(req.body.instapath)){
          req.body.instagram.tipoImagen = getImageExtension(req.body.imagepath)
          req.body.instagram.data = fs.readFileSync(req.body.instapath)
        }else{
          return res.status(500).json('Error: No se encontró la imagen del código QR de Instagram.');
        }
      }
      
      if(req.body.twitterpath) {
        if(fs.existsSync(req.body.twitterpath)){
          req.body.twitter.tipoImagen = getImageExtension(req.body.imagepath)
          req.body.twitter.data = fs.readFileSync(req.body.twitterpath)
        }else{
          return res.status(500).json('Error: No se encontró la imagen del código QR de Twitter.');
        }
      }
      
      const readStream = fs.createReadStream(req.body.filepath);
      const uploadStream = bucket.openUploadStream(req.body.titulo + '.zip', {
        contentType: req.body.tipoArchivo
      });
      readStream.pipe(uploadStream);

      uploadStream
        .on('error', function (error) {
          return res.status(500).send("Error al subir el archivo zip: " + error);
        })
        .on('finish', async () => {
          req.body.bucketId = uploadStream.id;
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
adminVideogameController.getVideogames = async function (req, res) {
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
  Videojuego.findByIdAndDelete({ _id: new mongodb.ObjectId(req.body._id) }, async (err, videogame) => {
    if (err) {
      return res.status(500).json(err.message)
    } else if (!videogame) {
      return res.status(404).json('Error: No se ha encontrado el videojuego.')
    } else {
      var bucketId = req.body.bucketId;
  
      const file = await bucket.find({ _id: new mongodb.ObjectId(bucketId) }).toArray();
      if (!file) {
        return res.status(404).send('Error: No se ha encontrado el archivo para eliminarlo.');
      }
      await bucket.delete(file[0]._id);
      return res.status(204).send("Archivo eliminado.");
    }
  })
}

// Actualizar un videojuego
adminVideogameController.putVideogame = async (req, res) => {
  var updatedFields = {};
  var videogame = req.body;

  if(videogame.titulo && !videogame.filepath) {
    if(videogame.bucketId) {
      const file = await bucket.find({ _id: new mongodb.ObjectId(videogame.bucketId) }).toArray();
      if (!file) {
        return res.status(404).send('Error: No se ha encontrado el archivo zip para actualizar el título del videojuego.');
      }
      await bucket.rename(file[0]._id, videogame.titulo+".zip");
    } else {
      return res.status(500).json('Error: Se necesita un bucketId para actualizar el título del videojuego.');
    }
  }

  if(videogame.filepath) {
    if(path.extname(videogame.filepath) != ".zip") {
      return res.status(500).json('Error: El archivo del videojuego debe ser un zip.');
    } else if(!videogame.bucketId) {
      return res.status(500).json('Error: Se necesita un bucketId para actualizar el archivo del videojuego.');
    } else {
      const file = await bucket.find({ _id: new mongodb.ObjectId(videogame.bucketId) }).toArray();
      if (!file) {
        return res.status(404).send('Error: No se ha encontrado el archivo zip para actualizarlo.');
      }

      var uploadStream;

      if(videogame.titulo) {
        uploadStream = bucket.openUploadStream(videogame.titulo+".zip");
      } else {
        uploadStream = bucket.openUploadStream(file[0].filename);
      }
    
      const readStream = fs.createReadStream(videogame.filepath);

      readStream.pipe(uploadStream)
        .on('finish', async () => {
          await bucket.delete(file[0]._id);
        })
        .on('error', async (error) => {
          return res.status(500).send("Error al subir el archivo zip: " + error);
        });

      Object.assign(updatedFields, { bucketId: uploadStream.id });
    }
  }

  if(videogame.imagepath) {
    if (isValidImageExtension(videogame.imagepath)) {
      if(fs.existsSync(videogame.imagepath)) {
        Object.assign(updatedFields, { portada: {tipoImagen: getImageExtension(videogame.imagepath), 
          data: fs.readFileSync(videogame.imagepath)} });
      } else {
        return res.status(500).json('Error: No se ha encontrado la imagen de portada.');
      }
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(videogame.facepath) {
    if (isValidImageExtension(videogame.facepath)) {
      if(fs.existsSync(videogame.facepath)) {
        Object.assign(updatedFields, { facebook: {tipoImagen: getImageExtension(videogame.facepath), 
          data: fs.readFileSync(videogame.facepath)} });
      } else {
        return res.status(500).json('Error: No se ha encontrado la imagen del código QR de Facebook.');
      }
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(videogame.instapath) {
    if (isValidImageExtension(videogame.instapath)) {
      if(fs.existsSync(videogame.instapath)) {
        Object.assign(updatedFields, { instagram: {tipoImagen: getImageExtension(videogame.instapath), 
          data: fs.readFileSync(videogame.instapath)} });
      } else {
        return res.status(500).json('Error: No se ha encontrado la imagen del código QR de Instagram.');
      }
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(videogame.twitterpath) {
    if (isValidImageExtension(videogame.twitterpath)) {
      if(fs.existsSync(videogame.twitterpath)) {
        Object.assign(updatedFields, { twitter: {tipoImagen: getImageExtension(videogame.twitterpath), 
          data: fs.readFileSync(videogame.twitterpath)} });
      } else {
        return res.status(500).json('Error: No se ha encontrado la imagen del código QR de Twitter.');
      }
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(videogame.tags && videogame.tags.length == 0) {
    return res.status(500).json('Error: No se encontraron etiquetas.');
  } else {
    Object.assign(updatedFields, {tags: videogame.tags});
  }

  if(videogame.titulo) {
    Object.assign(updatedFields, {titulo: videogame.titulo})
  }

  if(videogame.sinopsis) {
    Object.assign(updatedFields, {sinopsis: videogame.sinopsis})
  }

  if(videogame.usuario) {
    Object.assign(updatedFields, {usuario: videogame.usuario})
  }

  var updatedFieldsSet =  { $set: updatedFields };

  Videojuego.findOneAndUpdate({ _id: videogame._id }, updatedFieldsSet, (err, videogame) => {
    if (err) {
      return res.status(500).json(err.message);
    } else if (!videogame) {
      return res.status(404).json('Error: No se encontró el videojuego.');
    } else {
      return res.status(200).json('Los campos válidos del videojuego se han actualizado correctamente.');
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

// Eliminar un videojuego archivo zip
adminVideogameController.deleteZipFile = async function (req,res) {
  var bucketId = req.params.bucketId;

  const file = await bucket.find({ _id: new mongodb.ObjectId(bucketId) }).toArray();
  if (!file) { 
    return res.status(404).send('Error: No se ha encontrado el archivo zip para eliminarlo.'); 
  }
  await bucket.delete(file[0]._id);
  return res.status(200).send("Archivo eliminado.");
}

module.exports = adminVideogameController
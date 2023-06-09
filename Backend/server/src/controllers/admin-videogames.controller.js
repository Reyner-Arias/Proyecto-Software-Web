const adminVideogameController = {};

const Videogame = require("../models/videogame");
const path = require("path");
const mongodb = require("mongodb");
const fs = require("fs");
const axios = require('axios');
const mongoose = require("../database");

const MongoClient = require('mongodb').MongoClient;
const GridFSBucket = require('mongodb').GridFSBucket;
const uri = "mongodb://hacketech:A83E9VyVMDyZQ38@140.84.184.137:27017/ExcalinestDB";
//const uri = 'mongodb+srv://excalinest:AcWqA5Ez6LNGUiKF@excalinestcluster.auytmua.mongodb.net/ExcalinestDB?retryWrites=true&w=majority';
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
  switch (path.extname(imagepath).toLowerCase()) {
    case '.png': return true;
    case '.jpg': return true;
    case '.jpeg': return true;
    default: return false;
  }
}

function clearFilesDirectory(archivosSubidos){
  // Eliminar los archivos después agregarlos a ./files
  if (archivosSubidos) {
    for (const campo in archivosSubidos) {
      if (Array.isArray(archivosSubidos[campo])) {
        archivosSubidos[campo].forEach((archivo) => {
          fs.unlink(".\\" + archivo.path, (err) => {
            if (err) {
              console.error('Error al eliminar el archivo temporal:', err);
            }
          });
        });
      }
    }
  }
}

// Crear un nuevo videojuego
adminVideogameController.postVideogame = async function (req, res) {
  if(req.login_type != "desarrollador" && req.login_type != "administrador") {
    clearFilesDirectory(req.files);
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

  const newVideogame = new Videogame();

  const coverFile = req.files['portada'][0];
  const zipFile = req.files['archivo'][0];
  const facebookFile = req.files['facebook'][0];
  const instaFile = req.files['instagram'][0];
  const twitterFile = req.files['twitter'][0];

  if(!req.body.titulo || !req.body.sinopsis || !req.body.tags ||
     !coverFile || !zipFile || !facebookFile || !instaFile || !twitterFile) {
    clearFilesDirectory(req.files);
    return res.status(500).json('Error: No se encontraron todos los datos del videojuego.');
  }

  const videogameTags = req.body.tags.replace(',', ''); // Formato de las tags actualmente: idTag1,idTag2,idTag3

  if(videogameTags.length == 0) {
    clearFilesDirectory(req.files);
    return res.status(500).json('Error: No se encontraron etiquetas.');
  } else {
    for (const tag of videogameTags) {
      try {
        axios.interceptors.request.use(config => {
          config.headers.Authorization = req.token;
          return config;
        });
        const options = { 'method': 'GET', 'url': 'http://localhost:3000/admin-tags/get/' +`${tag}` }
        await axios(options);
      } catch(err) {
        clearFilesDirectory(req.files);
        if(err.response.status == 404) {
          return res.status(404).json('Error: No se encuentra la etiqueta '+ tag +'. Cree la etiqueta antes de agregarla al videojuego.');
        } else {
          return res.status(500).json(err.message);
        }
      }
    }
  }

  if (path.extname(zipFile.path) == ".zip") {
    if (isValidImageExtension(coverFile.path) && isValidImageExtension(facebookFile.path) 
      && isValidImageExtension(instaFile.path) && isValidImageExtension(twitterFile.path)) {

      delete req.body._id;
      
      if(coverFile) {
        newVideogame.portada = {tipoImagen: coverFile.type,
          data: fs.readFileSync(coverFile.path)}
      }

      if(facebookFile) {
        newVideogame.facebook = {tipoImagen: facebookFile.type,
          data: fs.readFileSync(facebookFile.path)}
      }

      if(instaFile) {
        newVideogame.instagram = {tipoImagen: instaFile.type,
          data: fs.readFileSync(instaFile.path) }
      }
      
      if(twitterFile) {
        newVideogame.twitter = {tipoImagen: twitterFile.type,
          data: fs.readFileSync(twitterFile.path) }
      }
      
      const readStream = fs.createReadStream(zipFile.path);
      const uploadStream = bucket.openUploadStream(req.body.titulo + '.zip', {
        contentType: zipFile.type
      });
      readStream.pipe(uploadStream);

      uploadStream
        .on('error', function (error) {
          clearFilesDirectory(req.files);
          return res.status(500).json("Error al subir el archivo zip: " + error);
        })
        .on('finish', async () => {

          newVideogame.bucketId = uploadStream.id;
          newVideogame.titulo = req.body.titulo;
          newVideogame.sinopsis = req.body.sinopsis;
          newVideogame.usuario = req.login_username;
        
          clearFilesDirectory(req.files);

          await newVideogame.save(async (err, newVideogame) => {
            if (err) {
              if (err.code === 11000) {
                res.status(422).json('Error: El videojuego ya existe, cambiar el título.');
              } else {
                res.status(500).json(err.message)
              }
            } else {
              for (const tag of videogameTags) {
                try{
                  let newVideogameTag = {videogame: newVideogame._id, tag: tag};
                  await axios.post("http://localhost:3000/videogame-tag/post", newVideogameTag);
                } catch(err) {
                  return res.status(500).json(err.message);
                }
              }
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
  if(req.login_type != "desarrollador" && req.login_type != "administrador") {
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

  Videogame.find({}, (err, videogames) => {
    if (err) {
      res.status(500).json(err.message)
    } else {
      res.status(200).json(videogames)
    }
  })
}

// Obtener la cantidad de videojuegos con solo una etiqueta específica
adminVideogameController.countVideogamesWithOnlySpecificTag = async function (req, res) {
  const tagId = req.params.tagId;
  Videogame.countDocuments({ tags: { $size: 1, $elemMatch: { id: tagId } } }, (err, count) => {
    if (err) {
      return res.status(500).json(err.message)
    } else {
      return res.status(200).json(count);
    }
  });
};

// Eliminar un videojuego
adminVideogameController.deleteVideogame = async function (req, res) {
  if(req.login_type != "desarrollador" && req.login_type != "administrador") {
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

  Videogame.findByIdAndDelete({ _id: new mongodb.ObjectId(req.body._id) }, async (err, videogame) => {
    if (err) {
      return res.status(500).json(err.message)
    } else if (!videogame) {
      return res.status(404).json('Error: No se ha encontrado el videojuego.')
    } else {  
      const file = await bucket.find({ _id: new mongodb.ObjectId(videogame.bucketId) }).toArray();
      if (!file) {
        return res.status(404).json('Error: No se ha encontrado el archivo para eliminarlo.');
      }
      await bucket.delete(file[0]._id);

      try {
        axios.interceptors.request.use(config => {
          config.headers.Authorization = req.token;
          return config;
        });
        await axios.delete("http://localhost:3000/videogame-tag/delete-by-videogame/"+`${req.body._id}`)
      } catch(err) {
        return res.status(500).json(err.message);
      }
      
      return res.status(200).json('Archivo eliminado.');
    }
  })
}

// Actualizar un videojuego
adminVideogameController.putVideogame = async (req, res) => {
  if(req.login_type != "desarrollador" && req.login_type != "administrador") {
    clearFilesDirectory(req.files);
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

  var updatedFields = {};
  var videogame = req.body;

  var coverFile = undefined;
  var zipFile = undefined;
  var facebookFile = undefined;
  var instaFile = undefined;
  var twitterFile = undefined;

  if(req.files['portada']){
    coverFile = req.files['portada'][0];
  }
  if(req.files['archivo']){
    zipFile = req.files['archivo'][0];
  }
  if(req.files['facebook']){
    facebookFile = req.files['facebook'][0];
  }
  if(req.files['instagram']){
    instaFile = req.files['instagram'][0];
  }
  if(req.files['twitter']){
    twitterFile = req.files['twitter'][0];
  }

  const videogameTags = req.body.tags.replace(',', ''); // Formato de las tags actualmente: idTag1,idTag2,idTag3

  if(videogame.titulo && !zipFile) {
    if(videogame.bucketId) {
      const file = await bucket.find({ _id: new mongodb.ObjectId(videogame.bucketId) }).toArray();
      if (!file) {
        return res.status(404).json('Error: No se ha encontrado el archivo zip para actualizar el título del videojuego.');
      }
      await bucket.rename(file[0]._id, videogame.titulo+".zip");
    } else {
      return res.status(500).json('Error: Se necesita un bucketId para actualizar el título del videojuego.');
    }
  }

  if(zipFile) {
    if(path.extname(zipFile.path) != ".zip") {
      clearFilesDirectory(req.files);
      return res.status(500).json('Error: El archivo del videojuego debe ser un zip.');
    } else if(!videogame.bucketId) {
      clearFilesDirectory(req.files);
      return res.status(500).json('Error: Se necesita un bucketId para actualizar el archivo del videojuego.');
    } else {
      const file = await bucket.find({ _id: new mongodb.ObjectId(videogame.bucketId) }).toArray();
      if (!file) {
        return res.status(404).json('Error: No se ha encontrado el archivo zip para actualizarlo.');
      }

      var uploadStream;

      if(videogame.titulo) {
        uploadStream = bucket.openUploadStream(videogame.titulo+".zip");
      } else {
        uploadStream = bucket.openUploadStream(file[0].filename);
      }
    
      const readStream = fs.createReadStream(zipFile.path);

      readStream.pipe(uploadStream)
        .on('finish', async () => {
          await bucket.delete(file[0]._id);
        })
        .on('error', async (error) => {
          clearFilesDirectory(req.files);
          return res.status(500).json("Error al subir el archivo zip: " + error);
        });

      Object.assign(updatedFields, { bucketId: uploadStream.id });
    }
  }

  if(coverFile) {
    if (isValidImageExtension(coverFile.path)) {
      Object.assign(updatedFields, { portada: {tipoImagen: coverFile.type, 
        data: fs.readFileSync(coverFile.path)} });
    } else {
      clearFilesDirectory(req.files);
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(facebookFile) {
    if (isValidImageExtension(facebookFile.path)) {
      Object.assign(updatedFields, { facebook: {tipoImagen: facebookFile.type, 
        data: fs.readFileSync(facebookFile.path)} });
    } else {
      clearFilesDirectory(req.files);
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(instaFile) {
    if (isValidImageExtension(instaFile.path)) {
      Object.assign(updatedFields, { instagram: {tipoImagen: instaFile.type, 
        data: fs.readFileSync(instaFile.path)} });
    } else {
      clearFilesDirectory(req.files);
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(twitterFile) {
    if (isValidImageExtension(twitterFile.path)) {
      Object.assign(updatedFields, { twitter: {tipoImagen: twitterFile.type, 
        data: fs.readFileSync(twitterFile.path)} });
    } else {
      clearFilesDirectory(req.files);
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(videogame.tags && videogame.tags.length == 0) {
    clearFilesDirectory(req.files);
    return res.status(500).json('Error: No se encontraron etiquetas.');
  } else if(videogame.tags) {
    for (const tag of videogame.tags) {
      try {
        axios.interceptors.request.use(config => {
          config.headers.Authorization = req.token;
          return config;
        });
        const options = { 'method': 'GET', 'url': 'http://localhost:3000/admin-tags/get/' +`${tag}` }
        await axios(options);
      } catch(err) {
        clearFilesDirectory(req.files);
        if(err.response.status == 404) {
          return res.status(404).json('Error: No se encuentra la etiqueta '+ tag +'. Cree la etiqueta antes de agregarla al videojuego.');
        } else {
          return res.status(500).json(err.message);
        }
      }
    }
  }

  if(videogame.titulo) {
    Object.assign(updatedFields, {titulo: videogame.titulo})
  }

  if(videogame.sinopsis) {
    Object.assign(updatedFields, {sinopsis: videogame.sinopsis})
  }

  clearFilesDirectory(req.files);

  var updatedFieldsSet =  { $set: updatedFields };

  Videogame.findOneAndUpdate({ _id: videogame._id }, updatedFieldsSet, async (err, videogame) => {
    if (err) {
      if (err.code === 11000) {
        res.status(422).json('Error: El videojuego ya existe, cambiar el título.');
      } else {
        res.status(500).json(err.message)
      }
    } else if (!videogame) {
      return res.status(404).json('Error: No se encontró el videojuego.');
    } else {
      try{
        await axios.post("http://localhost:3000/videogame-tag/update", {_id: req.body._id, tags: videogameTags});
        return res.status(200).json('Los campos válidos del videojuego se han actualizado correctamente.');
      } catch(err) {
        return res.status(500).json(err.message);
      }
    }
  })

  
};

// Descargar un videojuego archivo zip
adminVideogameController.getZipFile = async function (req,res) {
  const downloadStream = bucket.openDownloadStreamByName(req.body.filename)
      .on('error', function (error) {
        if (error.name === 'MongoRuntimeError' && error.message.includes('FileNotFound')) {
          return res.status(404).json("Error: No se encontró el archivo zip.");
        } else {
          return res.status(500).json("Error al descargar el archivo zip: " + error);
        }
      });
  
    res.setHeader('Content-Type', 'application/zip');
  
    downloadStream.pipe(res)
      .on('error', function (error) {
        return res.status(500).json("Error al descargar el archivo zip: " + error);
      })
      .on('finish', function () {
        res.end();
      });
}

// Eliminar un videojuego archivo zip
adminVideogameController.deleteZipFile = async function (req,res) {
  if(req.login_type != "desarrollador" && req.login_type != "administrador") {
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

  var bucketId = req.params.bucketId;

  const file = await bucket.find({ _id: new mongodb.ObjectId(bucketId) }).toArray();
  if (!file) { 
    return res.status(404).json('Error: No se ha encontrado el archivo zip para eliminarlo.'); 
  }
  await bucket.delete(file[0]._id);
  return res.status(200).json('Archivo eliminado.');
}

module.exports = adminVideogameController
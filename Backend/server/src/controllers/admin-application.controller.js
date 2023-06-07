const adminApplicationController = {};

const Application = require("../models/application");
const path = require("path");
const mongodb = require("mongodb");
const fs = require("fs");
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
const bucket = new GridFSBucket(db, { bucketName: 'application' });

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection closed');
    process.exit(0);
  })
});

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

// Publicar una nueva versión de la aplicación de escritorio
adminApplicationController.postApplication = async function (req, res) {
  const newApplication = new Application();

  const appFile = req.files['archivoApp'][0];

  if(!req.body.title || !appFile || !req.body.description) {
    return res.status(500).json('Error: No se encontraron todos los datos de la aplicación.');
  }

  if (path.extname(appFile.path) == ".zip") {
    delete req.body._id;

    const readStream = fs.createReadStream(appFile.path);
    const uploadStream = bucket.openUploadStream(req.body.title + '.zip', {
      contentType: appFile.type
    });
    readStream.pipe(uploadStream);

    uploadStream
      .on('error', function (error) {
        return res.status(500).json("Error al subir el archivo zip: " + error);
      })
      .on('finish', async () => {

        newApplication.bucketId = uploadStream.id;
        newApplication.title = req.body.title;
        newApplication.description = req.body.description;

        clearFilesDirectory(req.files);

        await newApplication.save(async (err, newApplication) => {
          if (err) {
            if (err.code === 11000) {
              res.status(422).json('Error: La aplicación ya existe, cambiar el título.');
            } else {
              res.status(500).json(err.message)
            }
          } else {
            res.status(201).json('La aplicación de escritorio Excalinest se ha publicado correctamente.')
          }
        });
      });
  } else {
    res.status(500).json('Error: El archivo de la aplicación debe ser un zip.');
  }
}

// Obtener todas las versiones de la aplicación
adminApplicationController.getAll = async function (req, res) {
  Application.find({}, {_id:1, title:1, description:1}, (err, applications) => {
    if (err) {
      res.status(500).json(err.message)
    } else {
      res.status(200).json(applications)
    }
  }).sort({_id: -1, title: -1, description:-1, createdAt:-1, updatedAt:-1 })
}

// Eliminar una versión de la aplicación
adminApplicationController.deleteApplication = async function (req, res) {
  Application.findByIdAndDelete({ _id: new mongodb.ObjectId(req.body._id) }, async (err, application) => {
    if (err) {
      return res.status(500).json(err.message)
    } else if (!application) {
      return res.status(404).json('Error: No se ha encontrado la aplicación.')
    } else {
      const file = await bucket.find({ _id: new mongodb.ObjectId(application.bucketId) }).toArray();
      if (!file) {
        return res.status(404).json('Error: No se ha encontrado el archivo para eliminarlo.');
      }
      await bucket.delete(file[0]._id);
      return res.status(200).json('Aplicación eliminada con éxito.');
    }
  })
}

// Descargar una versión de la aplicación en archivo zip
adminApplicationController.getZipFile = async function (req,res) {
  const writeStream = fs.createWriteStream(req.body.destPath + req.body.filename);
  const downloadStream = bucket.openDownloadStreamByName(req.body.filename)
    .on('error', function (error) {
      if (error.name === 'MongoRuntimeError' && error.message.includes('FileNotFound')) {
        return res.status(404).json("Error: No se encontró el archivo zip.");
      } else {
        return res.status(500).json("Error al descargar el archivo zip: " + error);
      }
    });

  downloadStream.pipe(writeStream)
    .on('error', function (error) {
      return res.status(500).json("Error al descargar el archivo zip: " + error);
    })
    .on('finish', function () {
      return res.status(200).json("Archivo descargado.");
    });
}

module.exports = adminApplicationController
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

//Funciones
adminVideogameController.postVideogame = async function (req, res) {
  if (path.extname(req.body.filepath) == ".zip") {
    if (isValidImageExtension(req.body.imagepath) && isValidImageExtension(req.body.facepath) 
      && isValidImageExtension(req.body.instapath) && isValidImageExtension(req.body.twitterpath)) {
      
      req.body.portada.data = fs.readFileSync(req.body.imagepath)
      //req.body.juegoZip.data = fs.readFileSync(req.body.filepath)
      req.body.facebook.data = fs.readFileSync(req.body.facepath)
      req.body.instagram.data = fs.readFileSync(req.body.instapath)
      req.body.twitter.data = fs.readFileSync(req.body.twitterpath)

      const readStream = fs.createReadStream(req.body.filepath);

      const uploadStream = bucket.openUploadStream('Mirror.zip', {
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
      res.send("Image file must be jpg, jpeg or png");
    }
  } else {
    res.send("Game file must be a zip file");
  }
}

adminVideogameController.getVideogame = async function (req,res) {
  const videojuegosEncontrados = await Videojuego.find(
    {},{_id: 1})
  console.log(videojuegosEncontrados)
  res.send(videojuegosEncontrados)
}

adminVideogameController.deleteVideogame = async function (req,res) {
  const videojuegoEncontrado = await Videojuego.findByIdAndDelete({
    _id: new mongodb.ObjectId(req.body._id)
  })
  res.send("Videogame deleted successfully")
}

adminVideogameController.getZipFile = async function (req,res) {
  
  const writeStream = fs.createWriteStream(req.body.destPath + req.body.filename);

  const downloadStream = bucket.openDownloadStreamByName(req.body.filename);

  downloadStream.pipe(writeStream);

  writeStream.on('finish', function() {
    console.log('File downloaded successfully');
  });

  res.send("Failed to download file");
}

module.exports = adminVideogameController
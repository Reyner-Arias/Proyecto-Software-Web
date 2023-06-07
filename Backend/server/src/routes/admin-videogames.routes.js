const { Router } = require("express");

const router = Router();
const adminVideogameController = require("../controllers/admin-videogames.controller");
const token = require("../controllers/token");
const multer = require('multer');

/* 
* Cuando se inserte el token
* --------------------------
* router.post("/", token.verifyToken, adminVideogameController.postVideogame);
*/ 

const storage = multer.diskStorage({  
    destination: (req, file, cb)=>{  
      cb(null, "files");
    },
    filename: (req, file, cb)=>{  
      const name = file.originalname;  
      cb(null, + Date.now() + '-' + Math.floor(Math.random() * 100000) + '-' + name);  
    }  
  });   

const processVideogameImages = multer({ storage }).fields([
    { name: 'portada', maxCount: 1 },
    { name: 'archivo', maxCount: 1 },
    { name: 'facebook', maxCount: 1 },
    { name: 'instagram', maxCount: 1 },
    { name: 'twitter', maxCount: 1 }
  ]);

router.post("/post", processVideogameImages, adminVideogameController.postVideogame);
router.get("/get", adminVideogameController.getVideogames);

// Obtener la cantidad de videojuegos con solo una etiqueta específica
router.get('/get-only-specific-tag-count/:tagId', adminVideogameController.countVideogamesWithOnlySpecificTag);

router.delete("/delete", adminVideogameController.deleteVideogame);
router.post("/get-zip-file", adminVideogameController.getZipFile);
router.put("/put", processVideogameImages, adminVideogameController.putVideogame);
router.delete("/delete-zip-file/:bucketId", adminVideogameController.deleteZipFile);

module.exports = router;
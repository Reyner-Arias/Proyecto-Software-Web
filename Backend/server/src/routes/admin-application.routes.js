const { Router } = require("express");

const router = Router();
const adminApplicationController = require("../controllers/admin-application.controller");
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

const processAppImages = multer({ storage }).fields([
    { name: 'portada', maxCount: 1 },
    { name: 'archivo', maxCount: 1 },
    { name: 'facebook', maxCount: 1 },
    { name: 'instagram', maxCount: 1 },
    { name: 'twitter', maxCount: 1 }
  ]);

router.post("/post", processAppImages, adminApplicationController.postApplication);
router.get("/get-all", adminApplicationController.getAll);
router.delete("/delete", adminApplicationController.deleteApplication);
router.post("/get-zip-file", adminApplicationController.getZipFile);

module.exports = router;
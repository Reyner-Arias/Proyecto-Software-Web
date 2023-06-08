const { Router } = require("express");
const router = Router();
const adminApplicationController = require("../controllers/admin-application.controller");
const token = require("../controllers/token");
const multer = require('multer');

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
    { name: 'archivoApp', maxCount: 1 }
  ]);

router.post("/post", token.verifyToken, adminApplicationController.postApplication);
router.get("/get-all", token.verifyToken, adminApplicationController.getAll);
router.delete("/delete", token.verifyToken, adminApplicationController.deleteApplication);
router.post("/get-zip-file", token.verifyToken, adminApplicationController.getZipFile);

module.exports = router;
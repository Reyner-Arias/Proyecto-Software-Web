const { Router } = require("express");
const router = Router();
const multer = require('multer');

const adminUserController = require("../controllers/admin-users.controller");
const token = require("../controllers/token");

const storage = multer.diskStorage({  
    destination: (req, file, cb)=>{  
      cb(null, "files");
    },
    filename: (req, file, cb)=>{  
      const name = file.originalname;  
      cb(null, + Date.now() + '-' + Math.floor(Math.random() * 100000) + '-' + name);  
    }  
  });   

const processUserImages = multer({ storage }).fields([
    { name: 'facebook', maxCount: 1 },
    { name: 'instagram', maxCount: 1 },
    { name: 'twitter', maxCount: 1 }
  ]);

router.post('/mail', adminUserController.mail);
router.post('/post', token.verifyToken, processUserImages, adminUserController.postUser);
router.post('/register', processUserImages, adminUserController.register);
router.get('/get-all', token.verifyToken, adminUserController.getAllUsers);
router.put('/put/:_id', token.verifyToken, processUserImages, adminUserController.putUser);
router.put('/put/profile/:_id', token.verifyToken, processUserImages, adminUserController.putProfile);
router.delete('/delete/:email', token.verifyToken, adminUserController.deleteUser);
router.get('/get', token.verifyToken, adminUserController.getUser);
router.get('/login/:email', adminUserController.login);

module.exports = router
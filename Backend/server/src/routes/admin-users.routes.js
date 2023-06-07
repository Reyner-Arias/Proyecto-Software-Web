const { Router } = require("express");
const router = Router();
const multer = require('multer');

const adminUserController = require("../controllers/admin-users.controller");

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

// Crear un nuevo usuario
router.post('/post', processUserImages, adminUserController.postUser);

// Consultar todos los usuarios
router.get('/get-all', adminUserController.getAllUsers);

// Editar un usuario
router.put('/put/:_id', processUserImages, adminUserController.putUser);

// Eliminar un usuario
router.delete('/delete/:email', adminUserController.deleteUser);

// Obtener un usuario
router.get('/get/:email', adminUserController.getUser);

// Enviar Correo
router.post('/mail/', adminUserController.mail);

module.exports = router
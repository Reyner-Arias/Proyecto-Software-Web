const { Router } = require("express");
const router = Router();

const adminUserController = require("../controllers/admin-users.controller");

// Crear un nuevo usuario
router.post('/post', adminUserController.postUser);

// Consultar todos los usuarios
router.get('/get-all', adminUserController.getAllUsers);

module.exports = router
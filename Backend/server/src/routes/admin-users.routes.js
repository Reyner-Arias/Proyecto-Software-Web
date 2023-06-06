const { Router } = require("express");
const router = Router();

const adminUserController = require("../controllers/admin-users.controller");
const token = require("../controllers/token");

// Crear un nuevo usuario
router.post('/post', adminUserController.postUser);

// Consultar todos los usuarios
router.get('/get-all', adminUserController.getAllUsers);

// Editar un usuario
router.put('/put/:_id', adminUserController.putUser);

// Eliminar un usuario
router.delete('/delete/:email', adminUserController.deleteUser);

// Obtener un usuario
router.get('/get', token.verifyToken, adminUserController.getUser);

// Obtener un usuario
router.get('/login/:email', adminUserController.login);

// Enviar Correo
router.post('/mail/', adminUserController.mail);

module.exports = router
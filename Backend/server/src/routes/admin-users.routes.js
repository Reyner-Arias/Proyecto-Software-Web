const { Router } = require("express");
const router = Router();

const adminUserController = require("../controllers/admin-users.controller");

// Crear un nuevo usuario
router.post('/post', adminUserController.postUser);

// Consultar todos los usuarios
router.get('/get-all', adminUserController.getAllUsers);

// Editar un usuario
router.put('/put/:_id', adminUserController.putUser);

// Eliminar un usuario
router.delete('/delete/:email', adminUserController.deleteUser);

module.exports = router
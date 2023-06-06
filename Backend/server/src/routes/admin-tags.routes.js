const { Router } = require("express");
const router = Router();

const adminTagController = require("../controllers/admin-tags.controller");
const token = require("../controllers/token");

// Crear una nueva etiqueta
router.post('/post', token.verifyToken, adminTagController.postTag);

// Obtener todas las etiquetas
router.get('/get', adminTagController.getTags);

// Obtener una etiqueta específica
router.get('/get/:id', token.verifyToken, adminTagController.getTag);

// Actualizar una etiqueta
router.put('/put/:id', adminTagController.putTag);

// Eliminar una etiqueta
router.delete('/delete/:id', adminTagController.deleteTag);

// Obtener id mayor
router.get('/getMaxId', adminTagController.getMaxId);

module.exports = router
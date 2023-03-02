const { Router } = require("express");
const router = Router();

const adminTagController = require("../controllers/admin-tags.controller");

// Crear una nueva etiqueta
router.post('/post', adminTagController.postTag);

// Obtener todas las etiquetas
router.get('/get', adminTagController.getTags);

// Obtener una etiqueta específica
router.get('/get/:id', adminTagController.getTag);

// Actualizar una etiqueta
router.put('/put/:id', adminTagController.putTag);

// Eliminar una etiqueta
router.delete('/delete/:id', adminTagController.deleteTag);

module.exports = router
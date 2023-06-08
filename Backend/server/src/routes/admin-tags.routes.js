const { Router } = require("express");
const router = Router();
const adminTagController = require("../controllers/admin-tags.controller");
const token = require("../controllers/token");

router.post('/post', token.verifyToken, adminTagController.postTag);
router.get('/get', token.verifyToken, adminTagController.getTags);
router.get('/get/:id', token.verifyToken, adminTagController.getTag);
router.put('/put/:id', token.verifyToken, adminTagController.putTag);
router.delete('/delete/:id', token.verifyToken, adminTagController.deleteTag);
router.get('/getMaxId', token.verifyToken, adminTagController.getMaxId);

module.exports = router
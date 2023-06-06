const { Router } = require("express");
const router = Router();
const adminUserController = require("../controllers/admin-users.controller");
const token = require("../controllers/token");

router.post('/post', token.verifyToken, adminUserController.postUser);
router.post('/register', adminUserController.register);
router.get('/get-all', token.verifyToken, adminUserController.getAllUsers);
router.put('/put/:_id', token.verifyToken, adminUserController.putUser);
router.put('/put/profile/:_id', token.verifyToken, adminUserController.putProfile);
router.delete('/delete/:email', token.verifyToken, adminUserController.deleteUser);
router.get('/get', token.verifyToken, adminUserController.getUser);
router.get('/login/:email', adminUserController.login);
router.post('/mail/', adminUserController.mail);

module.exports = router
const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const user_controller = require('../../controllers/userController');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, user_controller.register);

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, user_controller.login);

router.get('/all', auth.optional, user_controller.getAllUsers);

router.get('/get/email', auth.optional, user_controller.getUserByEmail);

router.get('/get/username', auth.optional, user_controller.getUserByUsername);

module.exports = router;
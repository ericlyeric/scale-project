const express = require('express');
const router = express.Router();

const auth_controller = require('../controllers/auth.controller') ;

router.post('/register', auth_controller.auth_register);

router.post('/login', auth_controller.auth_login);

router.get('/logout', auth_controller.auth_logout);

module.exports = router;
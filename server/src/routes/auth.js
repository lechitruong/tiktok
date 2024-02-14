const express = require('express');
const router = express.Router();
import AuthController from '../controller/AuthController';
router.post('/register', AuthController.register);
router.post('/vertify-email', AuthController.vertifyAccount);
router.post('/login', AuthController.login);
module.exports = router;

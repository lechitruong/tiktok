const express = require('express');
const router = express.Router();
import UserController from '../controller/UserController';
import Auth from '../middleware/auth';
router.get('/find', Auth.origin, UserController.findUser);
router.get('/:userId', Auth.isSeftUser, UserController.getUser);
module.exports = router;

const express = require('express');
const router = express.Router();
import UserController from '../controller/UserController';
import Auth from '../middleware/auth';
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
router.get('/find', Auth.origin, UserController.findUser);
router.get('/:userId', Auth.isSeftUser, UserController.getUser);
router.put(
    '/avatar/:userId',
    upload.single('avatar'),
    Auth.isSeftUser,
    UserController.updateAvatar
);
router.delete('/avatar/:userId', Auth.isSeftUser, UserController.removeAvatar);
router.put('/:userId', Auth.isSeftUser, UserController.updateUser);
module.exports = router;

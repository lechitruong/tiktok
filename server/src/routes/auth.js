const express = require('express');
const passport = require('passport');
const router = express.Router();
import AuthController from '../controller/AuthController';
import Auth from '../middleware/auth';
router.post('/register', AuthController.register);
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    })
);
router.get('/google/callback', Auth.authGoogle, AuthController.authGoogle);
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', Auth.authFacebook, AuthController.authGoogle);
router.post('/vertify-email', AuthController.vertifyAccount);
router.post('/login', AuthController.login);
module.exports = router;

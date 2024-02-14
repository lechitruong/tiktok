const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { forBidden, unauthorized } = require('../utils/handleResp');
class Auth {
    origin(req, res, next) {
        const token = req.headers.token;
        if (!token) {
            return unauthorized(`You're not authenticated`, res);
        }
        const accessToken = token.split(' ')[1];
        jwt.verify(
            accessToken,
            fs.readFileSync(path.join(__dirname, '..', 'key', 'publickey.crt')),
            { algorithm: 'RS256' },
            (err, user) => {
                if (err) {
                    return forBidden('Token is not valid', res);
                }
                req.user = user;
                next();
            }
        );
    }
    isSeftUser(req, res, next) {
        new Auth().origin(req, res, () => {
            if (
                req.user.id == req.params.userId ||
                req.user.roleValue === 'Admin'
            )
                next();
            else return forBidden('You are not allowed to access', res);
        });
    }
    isAdmin(req, res, next) {
        new Auth().origin(req, res, () => {
            if (req.user.roleValue === 'Admin') {
                return forBidden('You are not allowed to access', res);
            }
            next();
        });
    }
    isModerator(req, res, next) {
        new Auth().origin(req, res, () => {
            if (req.user.roleValue === 'Moderator') {
                return forBidden('You are not allowed to access', res);
            }
            next();
        });
    }
}
module.exports = new Auth();

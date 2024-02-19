import { sequelize } from '../models';
import * as authServices from '../services/auth';
import * as otpServices from '../services/otp';
import * as userServices from '../services/user';
const otpGenerator = require('otp-generator');
const fs = require('fs');
const path = require('path');
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { otpTemplateMail, sendMail } from '../utils/MailUtil';
import {
    alreadyExistRow,
    badRequest,
    internalServerError,
    notFound,
} from '../utils/handleResp';
let refreshTokenList = [];
class AuthController {
    generateAccessToken = (user) => {
        const privateKeyPath = path.join(__dirname, '..', 'key', 'private.pem');
        const privateKey = fs.readFileSync(privateKeyPath);
        return (
            'Bearer ' +
            jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    roleValue: user.roleData.value,
                },
                privateKey,
                { expiresIn: '5d', algorithm: 'RS256' }
            )
        );
    };
    generateRefreshToken = (user) => {
        const privateKeyPath = path.join(__dirname, '..', 'key', 'private.pem');
        const privateKey = fs.readFileSync(privateKeyPath);
        return (
            'Bearer ' +
            jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    roleValue: user.roleData.value,
                },
                privateKey,
                { expiresIn: '365d', algorithm: 'RS256' }
            )
        );
    };
    async register(req, res) {
        try {
            let { email, fullName, userName, password, association } = req.body;
            association = association ? association : '';
            if (!email || !fullName || !userName || !password)
                return badRequest('Please fill all required', res);
            const resp = await authServices.register(
                email,
                fullName,
                userName,
                password,
                association,
                false
            );
            if (resp[1]) {
                const otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                    specialChars: false,
                    digits: true,
                });
                const createOTP = await otpServices.createOTP(email, otp);
                console.log(otp);
                sendMail(
                    otpTemplateMail,
                    'OTP Mail',
                    'Your otp is ' + otp,
                    email
                );
                const { password, ...other } = resp[0];
                return res.status(200).json({
                    err: 0,
                    mes: 'Registered successfully, Your otp has been sent to email address',
                    user: { ...other },
                });
            } else {
                return alreadyExistRow(
                    'Email already exists or account not vertify',
                    res
                );
            }
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }

    async OAuth2(req, res) {
        try {
            const user = req.user;
            const accessToken = new AuthController().generateAccessToken(user);
            const refreshToken = new AuthController().generateRefreshToken(
                user
            );
            refreshTokenList.push(refreshToken);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
            });
            res.redirect(
                process.env.URL_CLIENT +
                    `/login-success/${user.id}?accessToken=${accessToken}`
            );
        } catch (error) {
            return internalServerError(res);
        }
    }
    async vertifyAccount(req, res) {
        try {
            const { email, otp } = req.body;
            const resp = await authServices.vertifyAccount(email, otp);
            if (resp != null) {
                const updateUser = await userServices.updateUser(
                    {
                        isVertified: true,
                    },
                    email
                );
                otpServices.deleteOTP({ email, otp });
                return res.status(200).json({
                    err: 0,
                    mes: 'Verified successfully, now you can login',
                });
            }
            return badRequest('OTP is not valid', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email && !password)
                return badRequest('Please fill all required', res);
            const user = await userServices.findOne({
                email,
                isVertified: true,
                association: '',
            });
            if (user == null)
                return notFound('Email not registered or not verified', res);
            const validatePassword = bcrypt.compareSync(
                password,
                user.password
            );
            if (!validatePassword)
                return badRequest('Password is incorrect', res);
            const accessToken = new AuthController().generateAccessToken(user);
            const refreshToken = new AuthController().generateRefreshToken(
                user
            );
            refreshTokenList.push(refreshToken);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
            });
            return res.status(200).json({
                err: 0,
                mes: 'Login successful',
                user,
                accessToken,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async logout(req, res) {
        refreshTokenList = refreshTokenList.filter(
            (token) => token !== res.cookies.refresh_token
        );
        res.clearCookie('refreshToken');
    }
}
export default new AuthController();

import * as userServices from '../services/user';
import { badRequest, internalServerError, notFound } from '../utils/handleResp';
const cloudinary = require('cloudinary').v2;
import * as avatarServices from '../services/avatar';
class UserController {
    async findUser(req, res) {
        try {
            const users = await userServices.findUsers(req.query);
            return res.status(200).json({
                err: 0,
                mes: '',
                users,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async getUser(req, res) {
        try {
            const user = await userServices.findOne({ id: req.params.userId });
            if (!user) return notFound('User not found', res);
            const { password, ...other } = user.dataValues;
            return res.status(200).json({
                err: 0,
                mes: 'Found user',
                user: { ...other },
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async updateAvatar(req, res) {
        try {
            const avatarImage = req.file.buffer;
            if (!req.file) return badRequest('Please choose avatar', res);
            const { userId } = req.params;
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_DB_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
                secure: true,
            });

            const user = await userServices.findOne({
                id: userId,
            });
            const oldPublicId = user.avatarData.publicId;

            if (user.avatarData.code != process.env.CODE_DEFAULT_AVATAR) {
                await cloudinary.api.delete_resources([oldPublicId], {
                    type: 'upload',
                    resource_type: 'image',
                });
            }
            cloudinary.uploader
                .upload_stream(
                    { folder: 'tiktok_avatar', resource_type: 'image' },
                    (error, result) => {
                        if (error) {
                            console.error(
                                'Error uploading to Cloudinary:',
                                error
                            );
                            return internalServerError(res);
                        }
                        const avatarModel = {
                            publicId: result.public_id,
                            url: result.url,
                            code: 'avatarOfUser' + userId,
                        };
                        avatarServices
                            .updateAvatar(oldPublicId, userId, avatarModel)
                            .then((resp) => {
                                if (resp) {
                                    userServices
                                        .findOne({ id: userId })
                                        .then((userData) => {
                                            return res.status(200).json({
                                                err: 0,
                                                mes:
                                                    'Uploaded avatar of user ' +
                                                    userId,
                                                user: userData,
                                            });
                                        });
                                } else
                                    return badRequest(
                                        'Something error occurred'
                                    );
                            });
                    }
                )
                .end(avatarImage);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async updateUser(req, res) {
        try {
            const { userName, fullName } = req.body;
            if (!userName && !fullName)
                return badRequest('Missing payload', res);
            const updateData = {};
            const { userId } = req.params;
            if (userName) updateData.userName = userName;
            if (fullName) updateData.fullName = fullName;
            const user = await userServices.updateUser(updateData, userId);
            if (user)
                return res.status(200).json({
                    err: 0,
                    mes: 'Updated user',
                });
            else return badRequest('Not found user', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
}
export default new UserController();

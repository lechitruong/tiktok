import * as userServices from '../services/user';
import { internalServerError, notFound } from '../utils/handleResp';
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
            return internalServerError();
        }
    }
}
export default new UserController();

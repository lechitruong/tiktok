import * as userServices from '../services/user';
import { internalServerError, notFound } from '../utils/handleResp';
class UserController {
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
            return internalServerError();
        }
    }
}
export default new UserController();

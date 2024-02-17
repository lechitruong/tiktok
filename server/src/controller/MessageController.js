import { badRequest, internalServerError } from '../utils/handleResp';
import * as messageServices from '../services/message';
class MessageController {
    async getMessagesOfChatroom(req, res) {
        try {
            const { chatroomId } = req.params;
            const resp = await messageServices.getListMessageOfChatroom(
                chatroomId,
                req.query
            );
            return res.status(200).json({
                err: 0,
                mes: '',
                ...resp,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async sendMessage(req, res) {
        try {
            const { chatroomId } = req.params;
            const { content } = req.body;
            const resp = await messageServices.sendMessage(
                req.user.id,
                chatroomId,
                content
            );
            return res.status(200).json({
                err: 0,
                mes: 'Sent message to chatroom ' + chatroomId,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async recallMessage(req, res) {
        try {
            const { messageId, userId } = req.params;
            const resp = await messageServices.recallMessage(messageId, userId);
            if (resp)
                return res.status(200).json({
                    err: 0,
                    mes: 'Recalled message',
                });
            else return badRequest('Not found message ' + messageId, res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
}
export default new MessageController();

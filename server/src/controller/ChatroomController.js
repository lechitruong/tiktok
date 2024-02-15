import { internalServerError } from '../utils/handleResp';
import * as chatroomServices from '../services/chatroom';
class ChatroomController {
    async getUsersInChatroom(req, res) {
        try {
            const { chatroomId } = req.params;
            const users = await chatroomServices.getUsersInChatroom(
                chatroomId,
                req.query
            );
            return res.status(200).json({
                err: 0,
                mes: '',
                ...users,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async getChatroomsOfUser(req, res) {
        try {
            const { userId } = req.params;
            const chatrooms = await chatroomServices.getChatroomsOfUser(
                userId,
                req.query
            );
            return res.status(200).json({
                err: 0,
                mes: '',
                ...chatrooms,
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async getChatroom(req, res) {}
    async addUserIntoChatroom(req, res) {}
    async removeUserFromChatroom(req, res) {}
}
export default new ChatroomController();

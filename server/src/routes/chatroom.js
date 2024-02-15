const express = require('express');
const router = express.Router();
import ChatroomController from '../controller/ChatroomController';
import Auth from '../middleware/auth';
router.get(
    '/user/:userId',
    Auth.isSeftUser,
    ChatroomController.getChatroomsOfUser
);
router.get(
    '/:chatroomId/users',
    Auth.isInChatroom,
    ChatroomController.getUsersInChatroom
);
module.exports = router;

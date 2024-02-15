import { badRequest, internalServerError } from '../utils/handleResp';
import * as followerServices from '../services/follower';
import * as chatroomServices from '../services/chatroom';
import * as userInChatroomServices from '../services/userInChatroom';
class FollowController {
    async getListFollower(req, res) {
        try {
            const { userId } = req.params;
            const { page, pageSize, orderBy, orderDirection } = req.body;
            let followers;
            if (!page || !pageSize || !orderBy || !orderDirection) {
                followers = await followerServices.getListFollower(userId);
            } else {
                followers = await followerServices.getListFollower(
                    userId,
                    page,
                    pageSize,
                    orderBy,
                    orderDirection
                );
            }

            return res.status(200).json({ ...followers });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async getListFollowing(req, res) {
        try {
            const { userId } = req.params;
            const { page, pageSize, orderBy, orderDirection } = req.body;
            let followings;
            if (!page || !pageSize || !orderBy || !orderDirection) {
                followings = await followerServices.getListFollowing(userId);
            } else {
                followings = await followerServices.getListFollowing(
                    userId,
                    page,
                    pageSize,
                    orderBy,
                    orderDirection
                );
            }
            return res.status(200).json({ ...followings });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async followUser(req, res) {
        try {
            const { userId } = req.params;
            if (userId == req.user.id) return internalServerError(res);
            const follow = await followerServices.followUser(
                req.user.id,
                userId
            );
            if (!follow[1])
                return res.status(200).json({
                    err: 1,
                    mes: "You're already following this user",
                });
            const isFriend = await followerServices.getFollower({
                follower: userId,
                followee: req.user.id,
            });
            if (isFriend) {
                // Create chatroom
                let newChatroom = await chatroomServices.createChatroom('');
                newChatroom = newChatroom.dataValues;
                console.log(newChatroom);
                // Add member into chatroom
                await userInChatroomServices.addUserInChatroom(
                    req.user.id,
                    newChatroom.id
                );
                await userInChatroomServices.addUserInChatroom(
                    userId,
                    newChatroom.id
                );
            }
            return res.status(200).json({
                err: 0,
                mes: 'Followed',
                follow: follow[0],
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async unfollowUser(req, res) {
        try {
            const { userId } = req.params;
            if (userId == req.user.id) return internalServerError(res);
            const isFollow = await followerServices.getFollower({
                follower: req.user.id,
                followee: userId,
            });
            if (!isFollow)
                return badRequest("You're not following this user", res);
            const isFriend = await followerServices.getFollower({
                follower: userId,
                followee: req.user.id,
            });
            if (isFriend) {
                const chatroomId =
                    await userInChatroomServices.findChatroomIdWithMembers(
                        req.user.id,
                        userId
                    );
                // Remove user from chatroom
                await userInChatroomServices.removeUserInChatroom(
                    req.user.id,
                    chatroomId
                );
                await userInChatroomServices.removeUserInChatroom(
                    userId,
                    chatroomId
                );
                await chatroomServices.removeChatroom(chatroomId);
            }
            await followerServices.unfollowUser(req.user.id, userId);
            return res.status(200).json({
                err: 0,
                mes: 'Unfollowed',
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
}
export default new FollowController();

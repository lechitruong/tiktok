import { where } from 'sequelize';
import db from '../models';

//3.6 findOne():query từ db.likepost trả kết quả lên PostController 
export const isLikedPost = ({ liker, postId }) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.LikePost.findOne({
                where: {
                    liker,
                    postId,
                },
            });
            if (resp) resolve(true);
            else resolve(false);
        } catch (error) {
            reject(error);
        }
    });
// 6. likePost(postId)
export const likePost = ({ liker, postId }) =>
    new Promise(async (resolve, reject) => {
        try {
            const isLiked = await isLikedPost({ liker, postId });
            if (!isLiked) {
                // 7.1 Return Result
                const resp = await db.LikePost.create({
                    liker,
                    postId,
                });
                // 7.2 Return Result
                resolve(resp);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
    // Alt người dùng đã like trước đó
    // 3.4 Phản hồi lại resp là false
export const unlikePost = ({ liker, postId }) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.LikePost.destroy({
                where: {
                    liker,
                    postId,
                },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const countLikesForPost = (postId) =>
    new Promise(async (resolve, reject) => {
        try {
            const count = await db.LikePost.count({
                where: {
                    postId,
                },
            });
            resolve(count);
        } catch (error) {
            reject(error);
        }
    });

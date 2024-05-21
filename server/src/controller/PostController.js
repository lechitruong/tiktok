import { badRequest, internalServerError } from '../utils/handleResp';
import UploadFile from '../utils/uploadFile';
const path = require('path');
import * as postServices from '../services/post';
import { uuidv4 } from 'uuid';
import * as likePostService from '../services/likePost';
class PostController {
    async likePost(req, res) {
        try {
            const { postId } = req.params;
            const likeData = { liker: req.user.id, postId };
            const isLiked = await likePostService.isLikedPost(likeData);
            if (isLiked) {
                return badRequest('You are already liked by this post', res);
            }
            const likePost = await likePostService.likePost(likeData);
            if (likePost) {
                return res.status(200).json({
                    err: 0,
                    mes: 'Like post successfully',
                });
            }
            return badRequest('Unknow error', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async unlikePost(req, res) {
        try {
            const { postId } = req.params;
            const likeData = { liker: req.user.id, postId };
            const isLiked = await likePostService.isLikedPost(likeData);
            if (!isLiked) {
                return badRequest("You haven't liked this post yet.", res);
            }
            const resp = await likePostService.unlikePost(likeData);
            return res.status(200).json({
                err: 0,
                mes: 'Unlike post successfully',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async sharePost(req, res) {
        try {
            const { postId } = req.params;
            const resp = await postServices.sharePost(postId);
            if (resp) {
                return res.status(200).json({
                    err: 0,
                    mes: 'Share post successfully',
                });
            }
            return badRequest('Unknow error', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }

    async getPostById(req, res) {
        try {
            const postList = await postServices.getPosts(
                req.params.postId,
                req.query,
                req
            );
            if (postList.posts[0])
                return res.status(200).json({
                    err: 0,
                    mes: '',
                    post: postList.posts[0],
                });
            else return badRequest('Not found post', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async getPosts(req, res) {
        try {
            if (req.params.userId) req.query.userId = req.params.userId;
            const posts = await postServices.getPosts(
                req.params.postId,
                req.query,
                req
            );
            return res.status(200).json({
                err: 0,
                mes: '',
                ...posts,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }

    async upload(req, res) {
        try {
            const { files } = req;
            const poster = req.user.id;
            const { title } = req.body;
            for (const file of files) {
                if (file.size / (1024 * 1024) > 30)
                    return badRequest(
                        'Cannot upload file with size more than 30mb',
                        res
                    );
            }
            const post = await postServices.insertPost({ poster, title });
            const video = files.filter((file) => file.fieldname == 'video')[0];
            if (!video.mimetype.includes('video'))
                return badRequest('Field video must be video type', res);
            const thumnail = files.filter(
                (file) => file.fieldname == 'thumnail'
            )[0];
            if (!thumnail.mimetype.includes('image'))
                return badRequest('Field thumnail must be image type', res);
            const videoUploadMain = await UploadFile.uploadToCloudinary(
                video.buffer,
                process.env.VIDEO_TYPE_FILE,
                process.env.CLOUDINARY_FOLDER_VIDEO
            );

            const thumnailUpload = await UploadFile.uploadToGGDriver(
                thumnail,
                'thumnailPost' + post.id,
                process.env.GG_DRIVE_FOLDER_THUMNAIL_ID
            );
            const videoUploadTmp = await UploadFile.uploadToGGDriver(
                video,
                'videoPost' + post.id + '.mp4',
                process.env.GG_DRIVE_FOLDER_VIDEO_ID
            );
            await postServices.updatePost(post.id, {
                videoId: videoUploadMain.id,
                videoUrl: videoUploadMain.url,
                thumnailId: thumnailUpload.id,
                thumnailUrl: thumnailUpload.url,
            });
            const postUpdated = await postServices.getOne(post.id);
            return res.json(postUpdated);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async removePost(req, res) {
        const removeFile = await UploadFile.removeFromGGDriver(
            req.body.thumnailId
        );
        return res.json(data);
    }
}
export default new PostController();

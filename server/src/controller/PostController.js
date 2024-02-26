import { internalServerError } from '../utils/handleResp';
import UploadFile from '../utils/uploadFile';
const path = require('path');
import * as postServices from '../services/post';
import { uuidv4 } from 'uuid';
import * as tmpPostServices from '../services/tmpPost';
class PostController {
    async likePost(req, res) {
        try {
            return res.status(200).json({
                err: 0,
                mes: '',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async unlikePost(req, res) {
        try {
            return res.status(200).json({
                err: 0,
                mes: '',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }

    async getPostById(req, res) {
        try {
            const postList = await postServices.getPosts(
                req.params.postId,
                req.query
            );
            return res.status(200).json({
                err: 0,
                mes: '',
                post: postList.posts[0],
            });
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
                req.query
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
            const post = await postServices.insertPost({ poster, title });
            const video = files.filter((file) => file.fieldname == 'video')[0];

            const thumnail = files.filter(
                (file) => file.fieldname == 'thumnail'
            )[0];

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
                'videoPost' + post.id,
                process.env.GG_DRIVE_FOLDER_VIDEO_ID
            );
            await postServices.updatePost(post.id, {
                videoId: videoUploadMain.id,
                videoUrl: videoUploadMain.url,
                thumnailId: thumnailUpload.id,
                thumnailUrl: thumnailUpload.url,
            });

            const postUpdated = postServices.getOne(post.id);
            await tmpPostServices.insert({
                postId: postUpdated.id,
                videoId: postUpdated.videoId,
                videoUrl: postUpdated.videoUrl,
            });
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

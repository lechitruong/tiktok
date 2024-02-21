import { internalServerError } from '../utils/handleResp';
import UploadFile from '../utils/uploadFile';
const path = require('path');
import * as postServices from '../services/post';
import { uuidv4 } from 'uuid';
class PostController {
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
                posts,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async upload(req, res) {
        try {
            const { files } = req;
            const uploadedFiles = [];
            console.log(files);
            const video = files.filter((file) => file.fieldname == 'video');
            const thumnail = files.filter(
                (file) => file.fieldname == 'thumnail'
            );
            const thumnailUpload = await UploadFile.uploadToGGDriver(
                thumnail,
                'thumnailPost'
            );
            return res.json(uploadedFiles);
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

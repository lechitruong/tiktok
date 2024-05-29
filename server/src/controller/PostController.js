import { badRequest, internalServerError } from '../utils/handleResp';
import UploadFile from '../utils/uploadFile';
import FfmpegUtil from '../utils/ffmpeg';
const path = require('path');
import * as postServices from '../services/post';
import { uuidv4 } from 'uuid';
import * as likePostService from '../services/likePost';
import {
    VISIBILITY_POST_FRIEND,
    VISIBILITY_POST_PRIVATE,
    VISIBILITY_POST_PUBLIC,
} from '../../constant';
const fs = require('fs');
class PostController {
    async upload(req, res) {
        let postId;
        let thumnailUpload;
        let videoUploadMain;
        let video;
        let thumnail;
        async function removeFileIfErr() {
            if (postId) await postServices.deletePost(postId);
            if (thumnailUpload)
                await UploadFile.removeFromGGDriver(thumnailUpload.id);
            if (videoUploadMain)
                await UploadFile.removeFromCloudinary(
                    process.env.VIDEO_TYPE_FILE,
                    videoUploadMain.id
                );
            if (video) fs.unlink(video.path);
            if (thumnail) fs.unlink(thumnail.path);
        }
        try {
            const { files } = req;
            const poster = req.user.id;
            const { title } = req.body;
            const visibility = parseInt(req.body.visibility);

            if (
                !title ||
                visibility == undefined ||
                ![
                    VISIBILITY_POST_FRIEND,
                    VISIBILITY_POST_PUBLIC,
                    VISIBILITY_POST_PRIVATE,
                ].includes(visibility)
            ) {
                return badRequest(
                    'Please enter full field and valid visibility value',
                    res
                );
            }
            for (const file of files) {
                if (file.size / (1024 * 1024) > 80)
                    return badRequest(
                        'Cannot upload file with size more than 80mb',
                        res
                    );
            }
            const post = await postServices.insertPost({
                poster,
                title,
                visibility,
            });
            postId = post.id;
            video = files.filter((file) => file.fieldname == 'video')[0];
            if (!video) {
                return badRequest('Please provide a video', res);
            }
            if (!video.mimetype.includes('video'))
                return badRequest('Field video must be video type', res);
            thumnail = files.filter((file) => file.fieldname == 'thumnail')[0];

            if (thumnail) {
                if (!thumnail.mimetype.includes('image'))
                    return badRequest('Field thumnail must be image type', res);
                thumnailUpload = await UploadFile.uploadToGGDriver(
                    thumnail,
                    'thumnailPost' + post.id,
                    process.env.GG_DRIVE_FOLDER_THUMNAIL_ID
                );
                fs.unlink(thumnail.path, function (err) {
                    if (err) {
                        removeFileIfErr();
                        thumnail = null;
                    }
                });
            } else {
                const thumnailBuffer = await FfmpegUtil.captureVideo(
                    video.path,
                    res
                );
                const thumnailFile = {
                    buffer: thumnailBuffer,
                    mimeType: 'image/jpeg',
                };
                thumnailUpload = await UploadFile.uploadToGGDriver(
                    thumnailFile,
                    'thumnailPost' + post.id,
                    process.env.GG_DRIVE_FOLDER_THUMNAIL_ID
                );
            }
            const videoBuffer = await UploadFile.getBufferFileWithPath(
                video.path
            );
            videoUploadMain = await UploadFile.uploadToCloudinary(
                videoBuffer,
                process.env.VIDEO_TYPE_FILE,
                process.env.CLOUDINARY_FOLDER_VIDEO
            );
            fs.unlink(video.path, function (err) {
                if (err) {
                    removeFileIfErr();
                    video = null;
                }
            });
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
            try {
                removeFileIfErr();
            } catch (err) {
                return internalServerError(res);
            }
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

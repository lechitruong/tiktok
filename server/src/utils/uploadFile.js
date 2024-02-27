import path from 'path';
const { google } = require('googleapis');
const { Stream } = require('stream');
const cloudinary = require('cloudinary').v2;
class UploadFile {
    KEYFILEPATH = path.join(__dirname, '../config/credentials.json');
    SCOPES = ['https://www.googleapis.com/auth/drive'];
    authGoogle = new google.auth.GoogleAuth({
        keyFile: this.KEYFILEPATH,
        scopes: this.SCOPES,
    });
    authCloundinary = () => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_DB_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
    };

    async uploadToGGDriver(file, fileName, folderId) {
        const bufferStream = new Stream.PassThrough();
        bufferStream.end(file.buffer);
        const { data } = await google
            .drive({
                version: 'v3',
                auth: this.authGoogle,
            })
            .files.create({
                media: {
                    mimeType: file.mimeType,
                    body: bufferStream,
                },
                requestBody: {
                    name: fileName,
                    parents: [folderId],
                },
                fields: 'id',
            });
        return {
            id: data.id,
            url: `https://drive.google.com/uc?export=view&id=${data.id}`,
        };
    }
    async removeFromGGDriver(fileId) {
        const data = await google
            .drive({
                version: 'v3',
                auth: this.authGoogle,
            })
            .files.delete({
                fileId,
            });
        return data;
    }
    async uploadToCloudinary(fileBuffer, typeFile, folderName) {
        this.authCloundinary();
        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    { folder: folderName, resource_type: typeFile },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            const data = {
                                id: result.public_id,
                                url: result.url,
                            };
                            resolve(data);
                        }
                    }
                )
                .end(fileBuffer);
        });
    }
    async removeFromCloudinary(typeFile, ...fileIds) {
        this.authCloundinary();
        await cloudinary.api.delete_resources([...fileIds], {
            type: 'upload',
            resource_type: typeFile,
        });
    }
}
export default new UploadFile();

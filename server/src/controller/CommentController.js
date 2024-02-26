class CommentController {
    async getCommentsOfPost(req, res) {
        try {
            return res.status(200).json({
                err: 0,
                mes: '',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }

    async getReplyCommentsOfCommentPost(req, res) {
        try {
            return res.status(200).json({
                err: 0,
                mes: '',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async commentPost(req, res) {
        try {
            return res.status(200).json({
                err: 0,
                mes: '',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async replyComment(req, res) {
        try {
            return res.status(200).json({
                err: 0,
                mes: '',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async removeCommentPost(req, res) {
        try {
            return res.status(200).json({
                err: 0,
                mes: '',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async removeReplyComment(req, res) {
        try {
            return res.status(200).json({
                err: 0,
                mes: '',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async likeCommentPost(req, res) {
        try {
            return res.status(200).json({
                err: 0,
                mes: '',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async likeReplyComment(req, res) {
        try {
            return res.status(200).json({
                err: 0,
                mes: '',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async unlikeCommentPost(req, res) {
        try {
            return res.status(200).json({
                err: 0,
                mes: '',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async unlikeReplyComment(req, res) {
        try {
            return res.status(200).json({
                err: 0,
                mes: '',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
}
export default new CommentController();

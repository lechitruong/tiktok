import { Op, where } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
export const getPosts = (
    postId,
    { page, pageSize, orderBy, orderDirection, userId, title }
) =>
    new Promise(async (resolve, reject) => {
        try {
            const queries = pagingConfig(
                page,
                pageSize,
                orderBy,
                orderDirection
            );
            const query = {};
            if (postId) query.where = { id: postId };
            if (title) query.where.title = { [Op.substring]: userName };
            if (userId)
                query.include = [
                    {
                        model: db.User,
                        attributes: ['id', 'userName', 'fullName'],
                        as: 'posterInfo',
                        where: { id: userId },
                        include: [
                            {
                                model: db.Avatar,
                                attributes: ['url'],
                                as: 'avatarData',
                            },
                        ],
                    },
                ];
            else
                query.include = [
                    {
                        model: db.User,
                        attributes: ['id', 'userName', 'fullName'],
                        as: 'posterInfo',
                        include: [
                            {
                                model: db.Avatar,
                                attributes: ['url'],
                                as: 'avatarData',
                            },
                        ],
                    },
                ];
            const getPostsQuery = Object.assign(query, queries);
            const posts = await db.Post.findAll(getPostsQuery);
            const totalItems = await db.Post.count(query);
            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;
            resolve({
                posts,
                pagination: {
                    orderBy: queries.orderBy,
                    page: queries.offset + 1,
                    pageSize: queries.limit,
                    orderDirection: queries.orderDirection,
                    totalItems,
                    totalPages,
                },
            });
        } catch (error) {
            reject(error);
        }
    });

export const getOne = (id) =>
    new Promise((resolve, reject) => {
        try {
            const post = db.Post.findOne({
                where: { id },
                include: [
                    {
                        model: db.User,
                        attributes: ['id', 'userName', 'fullName'],
                        as: 'posterInfo',
                        include: [
                            {
                                model: db.Avatar,
                                attributes: ['url'],
                                as: 'avatarData',
                            },
                        ],
                    },
                ],
            });
            resolve(post);
        } catch (error) {
            reject(error);
        }
    });
export const insertPost = ({
    poster,
    title,
    thumnailUrl,
    thumnailId,
    videoUrl,
    videoId,
}) =>
    new Promise((resolve, reject) => {
        try {
            const resp = db.Post.create({
                poster,
                title,
                thumnailUrl,
                thumnailId,
                videoUrl,
                videoId,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const removePost = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Post.destroy({
                where: {
                    id,
                },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const updatePost = (id, postModel) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Post.update(postModel, {
                where: {
                    id,
                },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const isFriend = (userId1, userId2) =>
    new Promise(async (resolve, reject) => {
        try {
            const isFollow = await followerServices.getFollower({
                follower: userId1,
                followee: userId2,
            });
            const isFollow2 = await followerServices.getFollower({
                follower: userId2,
                followee: userId1,
            });
            if (isFollow && isFollow2) resolve(true);
            else resolve(false);
        } catch (error) {
            reject(error);
        }
    });

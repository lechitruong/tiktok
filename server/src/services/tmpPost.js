import { Op, where } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
export const getTmpPostOver1Hour = ({
    page,
    pageSize,
    orderBy,
    orderDirection,
}) =>
    new Promise(async (resolve, reject) => {
        try {
            const queries = pagingConfig(
                page,
                pageSize,
                orderBy,
                orderDirection
            );
            const query = {};
            const oneHourAgo = new Date();
            oneHourAgo.setHours(oneHourAgo.getHours() - 1);

            const postOlderThan1Hour = await db.TmpPost.findAll({
                where: {
                    createdAt: {
                        [Sequelize.Op.lt]: oneHourAgo,
                    },
                },
                ...queries,
            });

            const totalItems = await await db.TmpPost.count({
                where: {
                    createdAt: {
                        [Sequelize.Op.lt]: oneHourAgo,
                    },
                },
            });

            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;
            resolve({
                postOlderThan1Hour,
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
            const post = db.TmpPost.findOne({
                where: { id },
            });
            resolve(post);
        } catch (error) {
            reject(error);
        }
    });
export const insert = ({ postId, videoUrl, videoId }) =>
    new Promise((resolve, reject) => {
        try {
            const resp = db.TmpPost.create({
                postId,
                videoUrl,
                videoId,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const remove = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.TmpPost.destroy({
                where: {
                    id,
                },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });

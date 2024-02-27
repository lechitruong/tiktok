import { Op } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
export const getListFollowing = (
    userId,
    { page, pageSize, orderBy, orderDirection, userName, fullName }
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
            if (userName) query.userName = { [Op.substring]: userName };
            if (fullName) query.fullName = { [Op.substring]: fullName };
            const followings = await db.Follower.findAll({
                where: {
                    followee: userId,
                },
                attributes: {
                    exclude: ['followerId', 'followeeId'],
                },
                ...queries,
                include: [
                    {
                        model: db.User,
                        as: 'followerData',
                        attributes: ['id', 'name', 'fullName', 'avatar'],
                    },
                    {
                        model: db.User,
                        as: 'followeeData',
                        attributes: {
                            exclude: [
                                'password',
                                'createdAt',
                                'updatedAt',
                                'roleCode',
                                'association',
                            ],
                        },
                        where: query,
                    },
                ],
            });
            const totalItems = await db.Follower.count({
                where: {
                    followee: userId,
                },
            });
            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;
            resolve({
                followings,
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
export const getListFollower = (
    userId,
    { page, pageSize, orderBy, orderDirection, userName, fullName }
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
            if (userName) query.userName = { [Op.substring]: userName };
            if (fullName) query.fullName = { [Op.substring]: fullName };
            const followers = await db.Follower.findAll({
                where: {
                    follower: userId,
                },
                attributes: {
                    exclude: ['followerId', 'followeeId'],
                },
                ...queries,
                include: [
                    {
                        model: db.User,
                        as: 'followerData',
                        attributes: {
                            exclude: [
                                'password',
                                'createdAt',
                                'updatedAt',
                                'roleCode',
                                'association',
                            ],
                        },
                    },
                    {
                        model: db.User,
                        as: 'followeeData',
                        attributes: {
                            exclude: [
                                'password',
                                'createdAt',
                                'updatedAt',
                                'roleCode',
                                'association',
                            ],
                        },
                        where: query,
                    },
                ],
            });
            const totalItems = await db.Follower.count({
                where: {
                    follower: userId,
                },
            });
            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;
            resolve({
                followers,
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
export const getFollower = (followerModel) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Follower.findOne({
                where: followerModel,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const followUser = (follower, followee) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Follower.findOrCreate({
                where: { follower, followee },
                defaults: {
                    follower,
                    followee,
                },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const unfollowUser = (follower, followee) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Follower.destroy({
                where: { follower, followee },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });

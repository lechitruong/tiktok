import { Op } from 'sequelize';
import db from '../models';
export const getListFollowing = (
    userId,
    page = 1,
    pageSize = 30,
    orderBy = 'createdAt',
    orderDirection = 'DESC'
) =>
    new Promise(async (resolve, reject) => {
        try {
            const followings = await db.Follower.findAll({
                where: {
                    followee: userId,
                },
                order: [[orderBy, orderDirection]],
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });
            const totalItems = await db.Follower.count({
                where: {
                    followee: userId,
                },
            });
            const totalPages = Math.ceil(totalItems / pageSize);
            resolve({
                followings,
                pagination: {
                    orderBy,
                    page,
                    pageSize,
                    orderDirection,
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
    page = 1,
    pageSize = 30,
    orderBy = 'createdAt',
    orderDirection = 'DESC'
) =>
    new Promise(async (resolve, reject) => {
        try {
            const followers = await db.Follower.findAll({
                where: {
                    follower: userId,
                },
                order: [[orderBy, orderDirection]],
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });
            const totalItems = await db.Follower.count({
                where: {
                    follower: userId,
                },
            });
            const totalPages = Math.ceil(totalItems / pageSize);
            resolve({
                followers,
                pagination: {
                    orderBy,
                    page,
                    pageSize,
                    orderDirection,
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

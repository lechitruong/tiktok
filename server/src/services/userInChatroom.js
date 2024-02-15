import { Op } from 'sequelize';
import db from '../models';
export const getUsersInChatroom = (chatroomId) =>
    new Promise(async (resolve, reject) => {
        try {
            const usersInChatroom = await db.UserInChatroom.findAll({
                where: {
                    chatroomId,
                },
                order: [[orderBy, orderDirection]],
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });
            const totalItems = await db.UserInChatroom.count({
                where: {
                    chatroomId,
                },
            });
            const totalPages = Math.ceil(totalItems / pageSize);
            resolve({
                usersInChatroom,
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
export const isExistUserInChatroom = (member, chatroomId) =>
    new Promise(async (resolve, reject) => {
        try {
            const isExistUserInChatroom = await db.UserInChatroom.findOne({
                where: {
                    member,
                    chatroomId,
                },
            });
            if (isExistUserInChatroom) resolve(true);
            else resolve(false);
        } catch (error) {
            reject(error);
        }
    });
export const findChatroomIdWithMembers = (...memberIds) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.UserInChatroom.findAll({
                attributes: ['chatroomId'],
                where: {
                    member: {
                        [Op.in]: [...memberIds],
                    },
                },
                raw: true,
                group: ['chatroomId'],
                having: db.sequelize.literal(
                    'COUNT(DISTINCT member) = ' + [...memberIds].length
                ),
            });
            resolve(resp[0].chatroomId);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
export const addUserIntoChatroom = (member, chatroomId) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.UserInChatroom.findOrCreate({
                where: {
                    member,
                    chatroomId,
                },
                defaults: {
                    member,
                    chatroomId,
                },
            });
            resolve(resp);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
export const removeUserFromChatroom = (member, chatroomId) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.UserInChatroom.destroy({
                where: {
                    member,
                    chatroomId,
                },
            });
            resolve(resp);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });

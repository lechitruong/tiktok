import { Op } from 'sequelize';
import db from '../models';
export const getChatroomsOfUser = (
    id,
    page = 1,
    pageSize = 10,
    orderBy = 'createdAt',
    orderDirection = 'DESC'
) =>
    new Promise(async (resolve, reject) => {
        try {
            const chatrooms = await db.Chatroom.findAll({
                where: {
                    id,
                },
                order: [[orderBy, orderDirection]],
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });
            const totalItems = await db.Chatroom.count({
                where: {
                    followee: userId,
                },
            });
            const totalPages = Math.ceil(totalItems / pageSize);
            resolve({
                chatrooms,
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
export const getChatroom = (chatroomModel) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Chatroom.findOne({
                where: chatroomModel,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const createChatroom = (name) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Chatroom.create({
                name,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const removeChatroom = (chatroomId) =>
    new Promise(async (resolve, reject) => {
        try {
            const usersInChatroom = await db.UserInChatroom.count({
                where: {
                    chatroomId,
                },
            });
            const messagesOfChatroom = await db.Message.count({
                where: {
                    chatroomId,
                },
            });
            if (usersInChatroom || messagesOfChatroom) {
                resolve(null);
            } else {
                const resp = await db.Chatroom.destroy({
                    where: {
                        id: chatroomId,
                    },
                });
                resolve(resp);
            }
        } catch (error) {
            reject(error);
        }
    });

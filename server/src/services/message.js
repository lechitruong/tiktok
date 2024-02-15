import { Op } from 'sequelize';
import db from '../models';
export const getListMessageOfChatroom = async (
    chatroomId,
    page = 1,
    pageSize = 30,
    orderBy = 'createdAt',
    orderDirection = 'DESC'
) =>
    new Promise(async (resolve, reject) => {
        try {
            const messages = await db.Message.findAll({
                where: {
                    chatroomId,
                },
                order: [[orderBy, orderDirection]],
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });
            const totalItems = await db.Message.count({
                where: {
                    chatroomId,
                },
            });
            const totalPages = Math.ceil(totalItems / pageSize);
            resolve({
                messages,
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
export const sendMessage = (sender, chatroomId, content) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Message.create({
                sender,
                chatroomId,
                content,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const recallMessage = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Message.destroy({
                where: {
                    id,
                },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });

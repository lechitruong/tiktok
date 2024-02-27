import { Op } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
export const getListMessageOfChatroom = async (
    chatroomId,
    { page, pageSize, orderBy, orderDirection, content }
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
            if (content) query.content = { [Op.substring]: content };
            if (chatroomId) query.chatroomId = chatroomId;
            const messages = await db.Message.findAll({
                where: query,
                attributes: {
                    exclude: ['sender'],
                },
                include: [
                    {
                        model: db.User,
                        as: 'senderData',
                        attributes: ['id', 'userName', 'fullName', 'avatar'],
                    },
                ],
                ...queries,
            });
            const totalItems = await db.Message.count({
                where: query,
            });
            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;
            resolve({
                messages,
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
export const recallMessage = (id, sender) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Message.destroy({
                where: {
                    sender,
                    id,
                },
            });
            if (resp) resolve(resp);
            else resolve(null);
        } catch (error) {
            reject(error);
        }
    });

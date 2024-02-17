import { Op, where } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
export const getNotifications = (
    userId,
    { page, pageSize, orderBy, orderDirection }
) =>
    new Promise(async (resolve, reject) => {
        try {
            const queries = pagingConfig(
                page,
                pageSize,
                orderBy,
                orderDirection
            );
            const users = await db.Notification.findAll({
                where: { userId },
                attributes: {
                    exclude: ['userId', 'updatedAt'],
                },
                ...queries,
            });
            const totalItems = await db.Notification.count({
                where: { userId },
            });
            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;
            resolve({
                users,
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
export const insertNotification = (userId, content) =>
    new Promise((resolve, reject) => {
        try {
            const resp = db.Notification.create({
                userId,
                content,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const removeNotification = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Notification.findOne({
                where: { id },
            });
            if (resp) {
                await resp.destroy();
                resolve(resp);
            } else resolve(null);
        } catch (error) {
            reject(error);
        }
    });

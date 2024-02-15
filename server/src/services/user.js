import { Op, where } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
export const findUsers = ({
    page,
    pageSize,
    orderBy,
    orderDirection,
    userName,
    fullName,
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
            if (userName) query.userName = { [Op.substring]: userName };
            if (fullName) query.fullName = { [Op.substring]: fullName };
            const users = await db.User.findAll({
                where: query,
                attributes: ['id', 'userName', 'fullName', 'avatar'],
                ...queries,
            });
            const totalItems = await db.User.count({
                where: query,
            });
            const totalPages = Math.ceil(totalItems / pageSize);
            resolve({
                users,
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
export const updateUser = (newDataUser, email) =>
    new Promise((resolve, reject) => {
        try {
            const resp = db.User.update(newDataUser, {
                where: { email },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const findOne = (user) =>
    new Promise((resolve, reject) => {
        try {
            const resp = db.User.findOne({
                where: user,
                attributes: {
                    exclude: ['roleCode'],
                },
                include: [
                    {
                        model: db.Role,
                        as: 'roleData',
                        attributes: ['id', 'value'],
                    },
                ],
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });

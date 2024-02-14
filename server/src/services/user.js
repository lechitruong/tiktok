import { where } from 'sequelize';
import db from '../models';

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

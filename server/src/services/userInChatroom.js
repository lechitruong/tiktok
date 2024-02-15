import { Op } from 'sequelize';
import db from '../models';
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
                group: ['chatroomId'],
                having: db.sequelize.literal(
                    'COUNT(DISTINCT member) = ' + [...memberIds].length
                ),
            });
            resolve(resp[0].dataValues.chatroomId);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
export const addUserInChatroom = (member, chatroomId) =>
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
export const removeUserInChatroom = (member, chatroomId) =>
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

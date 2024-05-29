import { Op, col, fn, literal, where } from 'sequelize';
import db, { Sequelize } from '../models';
import { pagingConfig } from '../utils/pagination';
import { formatQueryUser } from './user';
import post from '../models/post';
import { VISIBILITY_POST_FRIEND, VISIBILITY_POST_PUBLIC } from '../../constant';

export const insertPost = ({
    poster,
    title,
    thumnailUrl,
    thumnailId,
    videoUrl,
    videoId,
}) =>
    new Promise((resolve, reject) => {
        try {
            const resp = db.Post.create({
                poster,
                title,
                thumnailUrl,
                thumnailId,
                videoUrl,
                videoId,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const removePost = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Post.destroy({
                where: {
                    id,
                },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const updatePost = (id, postModel) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Post.update(postModel, {
                where: {
                    id,
                },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });

export const deletePost = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Post.destroy({
                where: { id },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });

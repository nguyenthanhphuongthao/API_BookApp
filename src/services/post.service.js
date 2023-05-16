import db from '../models';
const cloudinary = require('cloudinary').v2;
import { Op } from 'sequelize';

//READ
export const listPosts = ({page, limit, order, search_key, ...query}) => new Promise( async(resolve, reject) => {
    try {
        const queries = { raw: true, nest: true };
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const fLimit = +limit || +process.env.LIMIT_POSTS;
        queries.offset = offset * fLimit;
        queries.limit = fLimit;
        if (order) queries.order = [order];
        //if (search_key) query.name = { [Op.substring]: search_key };
        const response = await db.Post.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
                exclude: ['user_id', 'updatedAt']
            },
            nest: true,
            include: [
                { model: db.User, as: 'user', attributes: ['full_name', 'avatar'] }
            ]
        });
        resolve({
            err: response.count > 0 ? 0 : -1,
            message: response.count > 0 ? 'Tìm thấy bài đăng' : 'Không có bài đăng nào!',
            data: response
        });
    }
    catch (error) { 
        reject(error);
    }
});

//CREATE
export const createPost = (user_id, body, path) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Post.create({
            user_id,
            image: path,
            ...body
        });
        resolve({
            err: response ? 0 : -1,
            message: 'Thêm bài đăng thành công'
        });
    }
    catch (error) {
        reject(error);
    }
});

//UPDATE
export const updatePost = (user_id, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Post.update(body, {
            where: { 
                id: body.id,
                user_id
            }
        });
        resolve({
            err: response[0] > 0 ? 0 : -1,
            message: response[0] > 0 ? 'Cập nhật bài đăng thành công' : 'Cập nhật bài đăng thất bại!',
        });
    }
    catch (error) {
        reject(error);
    }
});

//UPDATE STATUS POST
export const updateStatusPost = (body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Post.update(body, {
            where: { id: body.id }
        });
        resolve({
            err: response[0] > 0 ? 0 : -1,
            message: response[0] > 0 ? 'Cập nhật trạng thái bài đăng thành công' : 'Cập nhật trạng thái bài đăng thất bại!',
        });
    }
    catch (error) {
        reject(error);
    }
});


//DELETE
//[id1, id2,..]
export const deletePosts = ({ids}) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Post.destroy({
            where: { id: ids }
        });
        resolve({
            err: response > 0 ? 0 : -1,
            message: `Xóa thành công ${response} bài đăng`,
        });
    }
    catch (error) {
        reject(error);
    }
});
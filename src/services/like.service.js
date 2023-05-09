import db from '../models';
import { Op } from 'sequelize';

//READ
export const listLikes = ({page, limit, order, search_key, ...query}) => new Promise( async(resolve, reject) => {
    try {
        const queries = { raw: true, nest: true };
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const fLimit = +limit || +process.env.LIMIT_LIKES;
        queries.offset = offset * fLimit;
        queries.limit = fLimit;
        if (order) queries.order = [order];
        //if (search_key) query.name = { [Op.substring]: search_key };
        const response = await db.Like.findAndCountAll({
            where: query,
            ...queries,
            attributes: ['id'],
            include: [
                { model: db.User, as: 'user', attributes: ['full_name'] },
                { model: db.Post, as: 'post', attributes: ['tcontent', 'image'] },
                { model: db.Status, as: 'status', attributes: ['value'] }
            ]
        });
        resolve({
            err: response.count > 0 ? 0 : -1,
            message: response.count > 0 ? 'Tìm thấy lượt yêu thích' : 'Không có lượt yêu thích nào!',
            data: response
        });
    }
    catch (error) {
        reject(error);
    }
});

//CREATE
export const createLike = (user_id, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Like.create({
            user_id,
            ...body
        });
        resolve({
            err: response ? 0 : -1,
            message: 'Thêm lượt yêu thích thành công'
        });
    }
    catch (error) {
        reject(error);
    }
});

//UPDATE
export const updateLike = (user_id, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Like.update(body, {
            where: { 
                id: body.id,
                user_id
            }
        });
        resolve({
            err: response[0] > 0 ? 0 : -1,
            message: response[0] > 0 ? 'Cập nhật lượt yêu thích thành công' : 'Cập nhật lượt yêu thích thất bại!',
        });
    }
    catch (error) {
        reject(error);
    }
});

//DELETE
//[id1, id2,..]
export const deleteLikes = ({ids}) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Like.destroy({
            where: { id: ids }
        });
        resolve({
            err: response > 0 ? 0 : -1,
            message: `Xóa thành công ${response} lượt yêu thích`,
        });
    }
    catch (error) {
        reject(error);
    }
});
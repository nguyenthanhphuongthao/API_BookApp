import db from '../models';
import { Op, where } from 'sequelize';
import { status_id } from '../helpers/joi_schema';

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
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                { model: db.User, as: 'user', attributes: ['full_name'] },
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
        const response = await db.Like.findOrCreate({
            where: { user_id, post_id: body.post_id },
            defaults: {
                user_id,
                ...body
            }
        });
        resolve({
            err: response[1] ? 0 : -1,
            message: response[1] ? 'Thêm lượt yêu thích thành công' : 'Đã tồn lại lượt yêu thích này',
            status_id: response[0].status_id
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
                post_id: body.post_id,
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
export const deleteLikes = (user_id, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Like.destroy({
            where: { user_id, post_id: body.post_id }
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
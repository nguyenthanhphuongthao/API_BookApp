import db from '../models';
import { Op } from 'sequelize';

//READ
export const listComments = ({page, limit, order, search_key, ...query}) => new Promise( async(resolve, reject) => {
    try {
        const queries = { raw: true, nest: true };
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const fLimit = +limit || +process.env.LIMIT_COMMENTS;
        queries.offset = offset * fLimit;
        queries.limit = fLimit;
        if (order) queries.order = [order];
        //if (search_key) query.name = { [Op.substring]: search_key };
        const response = await db.Comment.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                { model: db.User, as: 'user', attributes: ['full_name'] },
                { model: db.Status, as: 'status', attributes: ['value'] }
            ]
        });
        resolve({
            err: response.count > 0 ? 0 : -1,
            message: response.count > 0 ? 'Tìm thấy bình luận' : 'Không có bình luận nào!',
            data: response
        });
    }
    catch (error) {
        reject(error);
    }
});

//CREATE
export const createComment = (user_id, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Comment.create({
            user_id,
            ...body
        });
        resolve({
            err: response ? 0 : -1,
            message: 'Thêm bình luận thành công'
        });
    }
    catch (error) {
        reject(error);
    }
});

//UPDATE
export const updateComment = (user_id, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Comment.update(body, {
            where: { 
                id: body.id,
                user_id
            }
        });
        resolve({
            err: response[0] > 0 ? 0 : -1,
            message: response[0] > 0 ? 'Cập nhật bình luận thành công' : 'Cập nhật bình luận thất bại!',
        });
    }
    catch (error) {
        reject(error);
    }
});

//DELETE
//[id1, id2,..]
export const deleteComments = ({ids}) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Comment.destroy({
            where: { id: ids }
        });
        resolve({
            err: response > 0 ? 0 : -1,
            message: `Xóa thành công ${response} bình luận`,
        });
    }
    catch (error) {
        reject(error);
    }
});
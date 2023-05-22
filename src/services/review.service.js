import db from '../models';
import { Op } from 'sequelize';

//READ
export const listReviews = ({page, limit, order, search_key, ...query}) => new Promise( async(resolve, reject) => {
    try {
        const queries = { raw: true, nest: true };
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const fLimit = +limit || +process.env.LIMIT_REVIEWS;
        queries.offset = offset * fLimit;
        queries.limit = fLimit;
        if (order) queries.order = [order];
        //if (search_key) query.name = { [Op.substring]: search_key };
        const response = await db.Review.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                { model: db.User, as: 'user', attributes: ['full_name'] },
                { model: db.Book, as: 'book', attributes: ['title'] },
                { model: db.Status, as: 'status', attributes: ['value'] }
            ]
        });
        resolve({
            err: response.count > 0 ? 0 : -1,
            message: response.count > 0 ? 'Tìm thấy đánh giá' : 'Không có đánh giá nào!',
            data: response
        });
    }
    catch (error) {
        reject(error);
    }
});

//CREATE
export const createReview = (user_id, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Review.create({
            user_id,
            ...body
        });
        resolve({
            err: response ? 0 : -1,
            message: 'Thêm đánh giá thành công'
        });
    }
    catch (error) {
        reject(error);
    }
});

//UPDATE
export const updateReview = (user_id, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Review.update(body, {
            where: { 
                id: user_id,
                user_id
            }
        });
        resolve({
            err: response[0] > 0 ? 0 : -1,
            message: response[0] > 0 ? 'Cập nhật đánh giá thành công' : 'Cập nhật đánh giá thất bại!',
        });
    }
    catch (error) {
        reject(error);
    }
});

//DELETE
//[id1, id2,..]
export const deleteReviews = (id) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Review.destroy({
            where: id
        });
        resolve({
            err: response > 0 ? 0 : -1,
            message: `Xóa thành công ${response} đánh giá`,
        });
    }
    catch (error) {
        reject(error);
    }
});
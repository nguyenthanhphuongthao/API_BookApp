import db from '../models';
import { Op } from 'sequelize';

//READ
export const listHistories = ({page, limit, order, search_key, ...query}) => new Promise( async(resolve, reject) => {
    try {
        const queries = { raw: true, nest: true };
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const fLimit = +limit || +process.env.LIMIT_HISTORIES;
        queries.offset = offset * fLimit;
        queries.limit = fLimit;
        if (order) queries.order = [order];
        //if (search_key) query.name = { [Op.substring]: search_key };
        const response = await db.History.findAndCountAll({
            where: query,
            ...queries,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                { model: db.Book, as: 'book', attributes: { exclude: ['createdAt', 'updatedAt'] } }
            ]
        });
        resolve({
            err: response.count > 0 ? 0 : -1,
            message: response.count > 0 ? 'Tìm thấy lịch sử' : 'Không có lịch sử nào!',
            data: response
        });
    }
    catch (error) {
        reject(error);
    }
});

//CREATE
export const createHistory = (user_id, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.History.findOrCreate({
            where: { 
                user_id,
                book_id: body.book_id },
            defaults: {
                user_id,
                ...body
            }
        });
        resolve({
            err: response[1] ? 0 : -1,
            message: response[1] ? 'Thêm lịch sử thành công' : 'Đã tồn tại lịch sử này!',
        });
    }
    catch (error) {
        reject(error);
    }
});

//UPDATE
export const updateHistory = (user_id, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.History.update(body, {
            where: { 
                user_id,
                book_id: body.book_id }
        });
        resolve({
            err: response[0] > 0 ? 0 : -1,
            message: response[0] > 0 ? 'Cập nhật lịch sử thành công' : 'Cập nhật lịch sử thất bại!',
        });
    }
    catch (error) {
        reject(error);
    }
});

//DELETE
//[id1, id2,..]
export const deleteHistory = (user_id, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.History.destroy({
            where: { 
                user_id, 
                book_id: body.book_id 
            }
        });
        resolve({
            err: response > 0 ? 0 : -1,
            message: `Xóa thành công ${response} lịch sử`,
        });
    }
    catch (error) {
        reject(error);
    }
});
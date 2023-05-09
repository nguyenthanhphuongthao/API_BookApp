import db from '../models';
import { Op } from 'sequelize';

//READ
export const listBooks = ({page, limit, order, search_key, ...query}) => new Promise( async(resolve, reject) => {
    try {
        const queries = { raw: true, nest: true };
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const fLimit = +limit || +process.env.LIMIT_BOOKS
        queries.offset = offset * fLimit;
        queries.limit = fLimit;
        if (order) queries.order = [order];
        if (search_key) query.title = { [Op.substring]: search_key };
        if (search_key) query.author = { [Op.substring]: search_key };
        const response = await db.Book.findAndCountAll({
            where: query,
            ...queries,
            attributes: ['id', 'title', 'author', 'description', 'image_url', 'link'],
            include: [
                { model: db.Category, as: 'category', attributes: ['name'] },
                { model: db.Publisher, as: 'publisher', attributes: ['name'] },
                { model: db.Status, as: 'status', attributes: ['value'] }
            ]
        });
        resolve({
            err: response.count > 0 ? 0 : -1,
            message: response.count > 0 ? 'Tìm thấy sách' : 'Không có sách nào!',
            data: response
        });
    }
    catch (error) {
        reject(error);
    }
});

//CREATE
export const createBook = (body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Book.findOrCreate({
            where: { title: body.title },
            defaults: body
        });
        resolve({
            err: response[1] ? 0 : -1,
            message: response[1] ? 'Thêm sách thành công' : 'Đã tồn tại sách này!',
        });
    }
    catch (error) {
        reject(error);
    }
});

//UPDATE
export const updateBook = ({id, ...body}) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Book.update(body, {
            where: { id }
        });
        resolve({
            err: response[0] > 0 ? 0 : -1,
            message: response[0] > 0 ? 'Cập nhật sách thành công' : 'Cập nhật sách thất bại!',
        });
    }
    catch (error) {
        reject(error);
    }
});

//DELETE
//[id1, id2,..]
export const deleteBooks = ({ids}) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Book.destroy({
            where: { id: ids }
        });
        resolve({
            err: response > 0 ? 0 : -1,
            message: `Xóa thành công ${response} sách`,
        });
    }
    catch (error) {
        reject(error);
    }
});
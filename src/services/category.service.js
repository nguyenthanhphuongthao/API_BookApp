import db from '../models';
import { Op } from 'sequelize';

//READ
export const listCategories = ({page, limit, order, search_key, ...query}) => new Promise( async(resolve, reject) => {
    try {
        const queries = { raw: true, nest: true };
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const fLimit = +limit || +process.env.LIMIT_CATEGORIES;
        queries.offset = offset * fLimit;
        queries.limit = fLimit;
        if (order) queries.order = [order];
        if (search_key) query.name = { [Op.substring]: search_key };
        const response = await db.Category.findAndCountAll({
            where: query,
            ...queries,
            attributes: ['id', 'name']
        });
        resolve({
            err: response.count > 0 ? 0 : -1,
            message: response.count > 0 ? 'Tìm thấy danh mục sách' : 'Không có danh mục sách nào!',
            data: response
        });
    }
    catch (error) {
        reject(error);
    }
});

//CREATE
export const createCategory = (body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Category.findOrCreate({
            where: { name: body.name },
            defaults: body
        });
        resolve({
            err: response[1] ? 0 : -1,
            message: response[1] ? 'Thêm danh mục sách thành công' : 'Đã tồn tại danh mục sách này!',
        });
    }
    catch (error) {
        reject(error);
    }
});

//UPDATE
export const updateCategory = ({id, ...body}) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Category.update(body, {
            where: { id }
        });
        resolve({
            err: response[0] > 0 ? 0 : -1,
            message: response[0] > 0 ? 'Cập nhật danh mục sách thành công' : 'Cập nhật danh mục sách thất bại!',
        });
    }
    catch (error) {
        reject(error);
    }
});

//DELETE
//[id1, id2,..]
export const deleteCategories = ({ids}) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Category.destroy({
            where: { id: ids }
        });
        resolve({
            err: response > 0 ? 0 : -1,
            message: `Xóa thành công ${response} danh mục sách`,
        });
    }
    catch (error) {
        reject(error);
    }
});
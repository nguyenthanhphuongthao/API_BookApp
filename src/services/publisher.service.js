import db from '../models';
import { Op } from 'sequelize';

//READ
export const listPublishers = ({page, limit, order, search_key, ...query}) => new Promise( async(resolve, reject) => {
    try {
        const queries = { raw: true, nest: true };
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const fLimit = +limit || +process.env.LIMIT_PUBLISHERS;
        queries.offset = offset * fLimit;
        queries.limit = fLimit;
        if (order) queries.order = [order];
        if (search_key) query.name = { [Op.substring]: search_key };
        const response = await db.Publisher.findAndCountAll({
            where: query,
            ...queries,
            attributes: ['id', 'name']
        });
        resolve({
            err: response.count > 0 ? 0 : -1,
            message: response.count > 0 ? 'Tìm thấy nhà xuất bản' : 'Không có nhà xuất bản nào!',
            data: response
        });
    }
    catch (error) {
        reject(error);
    }
});

//CREATE
export const createPublisher = (body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Publisher.findOrCreate({
            where: { name: body.name },
            defaults: body
        });
        resolve({
            err: response[1] ? 0 : -1,
            message: response[1] ? 'Thêm nhà xuất bản thành công' : 'Đã tồn tại nhà xuất bản này!',
        });
    }
    catch (error) {
        reject(error);
    }
});

//UPDATE
export const updatePublisher = ({id, ...body}) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Publisher.update(body, {
            where: { id }
        });
        resolve({
            err: response[0] > 0 ? 0 : -1,
            message: response[0] > 0 ? 'Cập nhật nhà xuất bản thành công' : 'Cập nhật nhà xuất bản thất bại!',
        });
    }
    catch (error) {
        reject(error);
    }
});

//DELETE
//[id1, id2,..]
export const deletePublishers = ({ids}) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Publisher.destroy({
            where: { id: ids }
        });
        resolve({
            err: response > 0 ? 0 : -1,
            message: `Xóa thành công ${response} nhà xuất bản`,
        });
    }
    catch (error) {
        reject(error);
    }
});
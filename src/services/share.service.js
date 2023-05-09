import db from '../models';
import { Op } from 'sequelize';

//READ
export const listShares = ({page, limit, order, search_key, ...query}) => new Promise( async(resolve, reject) => {
    try {
        const queries = { raw: true, nest: true };
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const fLimit = +limit || +process.env.LIMIT_SHARES;
        queries.offset = offset * fLimit;
        queries.limit = fLimit;
        if (order) queries.order = [order];
        //if (search_key) query.name = { [Op.substring]: search_key };
        const response = await db.Share.findAndCountAll({
            where: query,
            ...queries,
            attributes: ['id', 'tcontent'],
            include: [
                { model: db.User, as: 'user', attributes: ['full_name'] },
                { model: db.Post, as: 'post', attributes: ['tcontent'], include: [{ model: db.User, as: 'user', attributes: ['full_name'] }] },
                { model: db.Status, as: 'status', attributes: ['value'] }
            ]
        });
        resolve({
            err: response.count > 0 ? 0 : -1,
            message: response.count > 0 ? 'Tìm thấy bài chia sẻ' : 'Không có bài chia sẻ nào!',
            data: response
        });
    }
    catch (error) {
        reject(error);
    }
});

//CREATE
export const createShare = (user_id, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Share.create({
            user_id,
            ...body
        });
        resolve({
            err: response ? 0 : -1,
            message: 'Thêm bài chia sẻ thành công'
        });
    }
    catch (error) {
        reject(error);
    }
});

//UPDATE
export const updateShare = (user_id, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Share.update(body, {
            where: { 
                id: body.id,
                user_id
            }
        });
        resolve({
            err: response[0] > 0 ? 0 : -1,
            message: response[0] > 0 ? 'Cập nhật bài chia sẻ thành công' : 'Cập nhật bài chia sẻ thất bại!',
        });
    }
    catch (error) {
        reject(error);
    }
});

//DELETE
//[id1, id2,..]
export const deleteShares = ({ids}) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.Share.destroy({
            where: { id: ids }
        });
        resolve({
            err: response > 0 ? 0 : -1,
            message: `Xóa thành công ${response} bài chia sẻ`,
        });
    }
    catch (error) {
        reject(error);
    }
});
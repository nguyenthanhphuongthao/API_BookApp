import { avatar } from '../helpers/joi_schema';
import db from '../models';

export const getCurrentUser = (id) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'role_id']
            },
            include: [
                { model: db.Role, as: 'role', attributes: ['value']}
            ]
        });
        resolve({
            err: response ? 0 : -1,
            message: response ? 'Tìm thấy tài khoản' : 'Không tìm thấy tài khoản!',
            userData: response
        });
    }
    catch (error) {
        reject(error);
    }
});

export const getProfile = (id) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'role_id']
            },
            include: [
                { model: db.Role, as: 'role', attributes: ['value']},
                { model: db.Post, as: 'posts',
                    attributes: ['tcontent', 'createdAt'],
                    include: [
                        { model: db.Comment, as: 'comments',
                            attributes: ['tcontent'],
                            include: [
                                { model: db.User, as: 'user', attributes: ['id','full_name']}
                        ]},
                        { model: db.Like, as: 'likes',
                            attributes: ['id'],
                            include: [
                                { model: db.User, as: 'user', attributes: ['id','full_name']}
                        ]},
                    ]}
            ]
        });
        resolve({
            err: response ? 0 : -1,
            message: response ? 'Tìm thấy tài khoản' : 'Không tìm thấy tài khoản!',
            userData: response
        });
    }
    catch (error) {
        reject(error);
    }
});

export const updateProfile = (id, data) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.User.update(data, {
            where: { id }
        });
        resolve({
            err: response[0] > 0 ? 0 : -1,
            message: response[0] > 0 ? 'Cập nhật thông tin thành công' : 'Cập nhật thông tin thất bại!'
        });
    }
    catch (error) {
        reject(error);
    }
});

export const updateAvatar = (id, file) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.User.update({avatar: file.path}, {
            where: { id }
        });
        resolve({
            err: response[0] > 0 ? 0 : -1,
            message: response[0] > 0 ? 'Cập nhật ảnh đại diện thành công' : 'Cập nhật ảnh đại diện thất bại!',
            avatar: file.path
        });
        if (file && !(response[0] > 0)) cloudinary.uploader.destroy(file.filename);
    }
    catch (error) {
        reject(error);
    }
});
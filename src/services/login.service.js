import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const login = ({email, password}) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { 
                email
            },
            raw: true,
            attributes: {
                exclude: ['token', 'createdAt', 'updatedAt']
            }
            });

        if (response && response.role_id != 2) {
            const isChecked = response && bcrypt.compareSync(password, response.password);
            const accessToken = isChecked ? jwt.sign({ id: response.id, full_name: response.full_name, role_id: response.role_id }, process.env.JWT_SECRET, { expiresIn: '30m'}) : null;
            //jwt-refresh-token
            const refreshToken = isChecked ? jwt.sign({ id: response.id }, process.env.JWT_SECRET_REFESH_TOKEN, { expiresIn: '30d'}) : null;
            
            if (isChecked) {
                delete response.password;
            }

            const history = await db.History.findAll({
                where: { user_id: response.id },
                raw: true,
                nest: true,
                attributes: {
                    exclude: ['user_id', 'createdAt', 'updatedAt']
                },
                include: [
                    { model: db.Book, as: 'book', attributes: ['title'] },
                    { model: db.Status, as: 'status', attributes: ['value'] }
                ]
            });

            resolve({
                err: accessToken ? 0 : -1,
                message: accessToken ? 'Đăng nhập thành công' : 'Mật khẩu không đúng!',
                access_token: accessToken ? `Bearer ${accessToken}` : null,
                refresh_token: refreshToken,
                user_data: isChecked ? response : null,
                history: isChecked ? history : null
            });

            if (refreshToken) {
                await db.User.update({ 
                    token: refreshToken 
                }, { 
                    where: { id: response.id }});
            }
        }
        else if (response && response.role_id == 2) {
            resolve({
                err: -1,
                message: 'Tài khoản của bạn chưa được kích hoạt!'
            });
        }
        else if (!response) {
            resolve({
                err: -1,
                message: 'Email chưa đăng ký tài khoản!'
            });
        }
    }
    catch (error) {
        reject(error);
    }
});

export const changePassword = (id, data) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
            raw: true
        });
        const isChecked = response && bcrypt.compareSync(data.old_password, response.password);
        if (isChecked) {
            const newPassword = hashPassword(data.new_password);
            const response = await db.User.update({
                password: newPassword
            }, {
                where: { id }
            });
            resolve({
                err: response[0] > 0 ? 0 : -1,
                message: response[0] > 0 ? 'Đổi mật khẩu thành công' : 'Đổi mật khẩu thất bại!'
            });
        }
        else {
            resolve({
                err: -1,
                message: 'Mật khẩu cũ không đúng!'
            });
        }
    }
    catch (error) {
        reject(error);
    }
});

export const refreshToken = ({refresh_token}) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { token: refresh_token },
        });
        if (response){
            //verify refresh token
            jwt.verify(refresh_token, process.env.JWT_SECRET_REFESH_TOKEN, async (err) => {
                if (err) {
                    resolve({
                        err: -1,
                        message: 'Refresh token is expired! Please login again!'
                    });
                }
                else {
                    const accessToken = jwt.sign({ id: response.id, full_name: response.full_name, role_id: response.role_id }, process.env.JWT_SECRET, { expiresIn: '5d'});
                    resolve({
                        err: 0,
                        message: 'Refresh token successfully!',
                        access_token: `Bearer ${accessToken}`,
                        refresh_token: refresh_token
                    });
                }
            });
        }
        else {
            resolve({
                err: -1,
                message: 'Refresh token failed!' //Refresh token is invalid!
            });
        }
    }
    catch (error) {
        reject(error);
    }
});

export const logout = (access_token, body) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { token: body.refresh_token },
        });
        if (response){
            await db.User.update({ 
                token: null 
            }, { 
                where: { id: response.id }});
            await db.Blacklist.create({
                user_id: response.id,
                token: access_token,
                isValid: false
            });
            resolve({
                err: 0,
                message: 'Đăng xuất thành công'
            });
        }
        else {
            resolve({
                err: -1,
                message: 'Đăng xuất thất bại!' //Refresh token is invalid!
            });
        }
    }
    catch (error) {
        reject(error);
    }
});
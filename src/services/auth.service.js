import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { unauthorized } from '../middlewares/handle_errors';

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const register = ({email, password, full_name, phone_number}) => new Promise( async(resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: {
                email,
                password: hashPassword(password),
                full_name,
                phone_number
            }
        });

        const accessToken = response[1] ? jwt.sign({ id: response[0].id, email: response[0].email, full_name: response[0].full_name, role_id: response[0].role_id }, process.env.JWT_SECRET, { expiresIn: '24h'}) : null;

        //send mail
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "thaownguyen21602@gmail.com",
                pass: "twibfassakmfhtvf"
            }
        });
        let mailOptions = {
            from: "thaownguyen21602@gmail.com",
            to: email,
            subject: 'Xác nhận đăng ký tài khoản',
            html: `<h1>Xác nhận đăng ký tài khoản</h1>
                <p>Click vào link sau để xác nhận tài khoản</p>
                <a href="http://localhost:5000/api/auth/verify?accessToken=${accessToken}">Xác nhận email</a>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        resolve({
            err: response[1] ? 0 : -1,
            message: response[1] ? 'Đăng ký tài khoản thành công. Email xác thực tài khoản đã được gửi đến email của bạn. Vui lòng xác thực mail trước khi đăng nhập!' : 'Email này đã được đăng ký tài khoản!',
            access_token: accessToken ? `Bearer ${accessToken}` : null
        });
    }
    catch (error) {
        reject(error);
    }
});

export const verify = (user) => new Promise( async(resolve, reject) => {
    try {
        if (user) {
            await db.User.update({
                role_id: 3
            }, {
                where: { id: user.id }
            });
            resolve({
                err: 0,
                message: 'Xác nhận tài khoản thành công'
            });
        } else {
            resolve({
                err: -1,
                message: 'Xác nhận tài khoản thất bại'
            });
        }
    } catch (error) {
        reject(error);
    }
});

export const resendVerify = (email) => new Promise( async(resolve, reject) => {
    try {
        const user = await db.User.findOne({
            where: { email, role_id: 2 }
        });
        const accessToken = user ? jwt.sign({ id: response.id, full_name: response.full_name, role_id: response.role_id }, process.env.JWT_SECRET, { expiresIn: '24h'}) : null;
        if (user) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: "thaownguyen21602@gmail.com",
                    pass: "twibfassakmfhtvf"
                }
            });
            let mailOptions = {
                from: "thaownguyen21602@gmail.com",
                to: email,
                subject: 'Xác nhận đăng ký tài khoản',
                html: `<h1>Xác nhận đăng ký tài khoản</h1>
                    <p>Click vào link sau để xác nhận tài khoản</p>
                    <a href="http://localhost:5000/api/auth/verify?accessToken=${accessToken}">Xác nhận email</a>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            resolve({
                err: 0,
                message: 'Gửi lại email xác nhận thành công'
            });
        } else {
            resolve({
                err: -1,
                message: 'Email này chưa đăng ký tài khoản!'
            });
        }
    } catch (error) {
        reject(error);
    }
});

export const sendOTP = (email) => new Promise( async(resolve, reject) => {
    try {
        const user = await db.User.findOne({
            where: { email }
        });

        if (user) {
            const otp = Math.floor(1000 + Math.random() * 9000);
            //send mail
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: "thaownguyen21602@gmail.com",
                    pass: "twibfassakmfhtvf"
                }
            });
            let mailOptions = {
                from: "thaownguyen21602@gmail.com",
                to: email,
                subject: 'Xác thực người dùng',
                html: `<h1>Xác thực người dùng</h1>
                    <p>OTP xác thực người dùng của bạn là: ${otp}</p>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            await db.User.update({
                otp
            }, {
                where: { id: user.id }
            });
            resolve({
                err: 0,
                message: 'OTP đã được gửi đến email của bạn. Vui lòng kiểm tra và điền OTP vào ô bên dưới để xác thực người dùng!'
            });
        }
        else {
            resolve({
                err: -1,
                message: 'Email này chưa đăng ký tài khoản!'
            });
        }
    }
    catch (error) {
        reject(error);
    }
});

export const checkOTP = ({email, otp}) => new Promise( async(resolve, reject) => {
    try {
        const user = await db.User.findOne({
            where: { email }
        });

        if (user) {
            if (user.otp == otp && user.role_id == 3) {
                resolve({
                    err: 0,
                    message: 'Xác thực người dùng thành công'
                });
                await db.User.update({
                    otp: 1
                }, {
                    where: { id: user.id }
                });
            }
            else {
                resolve({
                    err: -1,
                    message: 'OTP không đúng hoặc tài khoản chưa xác thực! Nếu là tài khoản admin thì bạn không có quyền đổi mật khẩu!'
                });
            }
        }
        else {
            resolve({
                err: -1,
                message: 'Email này chưa đăng ký tài khoản!'
            });
        }
    }
    catch (error) {
        reject(error);
    }
});

export const resetPassword = ({email, password}) => new Promise( async(resolve, reject) => {
    try {
        console.log(email, password);
        const response = await db.User.update({
            password: hashPassword(password)
        }, {
            where: { email, otp: 1 }
        });
        console.log(response);
        if (response[0] == 1) {
            resolve({
                err: 0,
                message: 'Cập nhật mật khẩu thành công'
            });
            await db.User.update({
                otp: null
            }, {
                where: { email }
            });
        }
        else {
            resolve({
                err: -1,
                message: 'Cập nhật mật khẩu thất bại'
            });
        }
    }
    catch (error) {
        reject(error);
    }
});
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { unauthorized } from './handle_errors';
import db from '../models';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return unauthorized('Required authorization!', res);
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, async(err, user) => {
        const token = await db.Blacklist.findOne({
            where: { token: accessToken, isValid: false },
            raw: true
        });
        if (token) return unauthorized('Access token is invalid!', res);
        else if (err) {
            const isChecked = err instanceof TokenExpiredError;
            if (!isChecked) return unauthorized('Access token is invalid!', res, isChecked);
            if (isChecked) return unauthorized('Access token is expired!', res, isChecked);
        }
        req.user = user;
        next();
    });
}

export const verifyTokenRegister = (req, res, next) => {
    try {
        const token = req.query;
        if (!token) return unauthorized('Required authorization!', res);
        const accessToken = token.accessToken;
        jwt.verify(accessToken, process.env.JWT_SECRET, async(err, user) => {
            const token = await db.Blacklist.findOne({
                where: { token: accessToken, isValid: false },
                raw: true
            });
            if (token) return unauthorized('Access token is invalid!', res);
            else if (err) {
                const isChecked = err instanceof TokenExpiredError;
                if (!isChecked) return unauthorized('Access token is invalid!', res, isChecked);
                if (isChecked) return unauthorized('Access token is expired!', res, isChecked);
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        return unauthorized('URL is wrong!', res);
    }
}
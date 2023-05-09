import { unauthorized } from './handle_errors';

export const isAdmin = (req, res, next) => {
    const { role_id } = req.user;
    if (role_id !== 1) return unauthorized('Yêu cầu quyền Admin!', res);
    next();
}

export const isCustomer = (req, res, next) => {
    const { role_id } = req.user;
    if (role_id == 2) return unauthorized('Vui lòng xác thực email!', res);
    next();
}
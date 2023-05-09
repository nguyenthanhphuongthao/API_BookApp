import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { email, password, refresh_token } from "../helpers/joi_schema";
import * as joi from "joi";

export const login = async (req, res) => {
    try {
        const { error } = joi.object().keys({ email, password }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.login(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return internalServerError(res)
    }
};

export const changePassword = async (req, res) => {
    try {
        const { error } = joi.object().keys({ old_password: password, new_password: password }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.changePassword(req.user.id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return internalServerError(res)
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { error } = joi.object().keys({ refresh_token }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.refreshToken(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return internalServerError(res)
    }
};

export const logout = async (req, res) => {
    try {
        const token = req.header('authorization');
        const accessToken = token.split(' ')[1];
        const { error } = joi.object().keys({ refresh_token }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.logout(accessToken, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return internalServerError(res)
    }
}
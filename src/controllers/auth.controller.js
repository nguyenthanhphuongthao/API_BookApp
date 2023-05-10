import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { email, password, full_name, phone_number, otp } from "../helpers/joi_schema";
import * as joi from "joi";

export const register = async (req, res) => {
    try {
        const { error } = joi.object().keys({ email, password, full_name, phone_number }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.register(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const verify = async (req, res) => {
    try {
        const response = await services.verify(req.user);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const resendVerify = async (req, res) => {
    try {
        const { error } = joi.object().keys({ email }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.resendVerify(req.body.email);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const sendOTP = async (req, res) => {
    try {
        const { error } = joi.object().keys({ email }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.sendOTP(req.body.email);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
}

export const checkOTP = async (req, res) => {
    try {
        const { error } = joi.object().keys({ email, otp }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.checkOTP(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { error } = joi.object().keys({ email, password }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.resetPassword(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
}


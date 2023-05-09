import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { full_name, phone_number, avatar } from "../helpers/joi_schema";
import * as joi from "joi";
const cloudinary = require('cloudinary').v2;

export const getCurrentUser = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await services.getProfile(id);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const getProfile = async (req, res) => {
    try {
        const response = await services.getProfile(req.query.id);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const { error } = joi.object({ full_name, phone_number }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.updateProfile(id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const updateAvatar = async (req, res) => {
    try {
        const { id } = req.user;
        const file = req.file || null;
        const path = file?.path;
        const { error } = joi.object({ avatar }).validate({avatar: path});
        if (error) {
            if (file) cloudinary.uploader.destroy(file.filename);
            return badRequest(error.details[0]?.message, res);
        }
        const response = await services.updateAvatar(id, file);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
}
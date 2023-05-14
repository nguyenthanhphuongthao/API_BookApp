import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { post_id, status_id } from "../helpers/joi_schema";
import * as joi from "joi";

export const listLikes = async (req, res) => {
    try {
        const response = await services.listLikes(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const createLike = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { error } = joi.object({ user_id, post_id }).validate({user_id, ...req.body});
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.createLike(user_id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const updateLike = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { error } = joi.object({user_id, post_id, status_id }).validate({user_id, ...req.body});
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.updateLike(user_id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const deleteLikes = async (req, res) => {
    try {
        const user_id = req.user.id;
        const response = await services.deleteLikes(user_id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
}
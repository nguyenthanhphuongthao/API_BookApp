import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { ids, id, user_id, post_id, tcontent, status_id } from "../helpers/joi_schema";
import * as joi from "joi";

export const listComments = async (req, res) => {
    try {
        const response = await services.listComments(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const createComment = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { error } = joi.object({ user_id, post_id, tcontent }).validate({user_id, ...req.body});
        console.log(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.createComment(user_id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const updateComment = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { error } = joi.object({ id, user_id, tcontent, status_id }).validate({user_id, ...req.body});
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.updateComment(user_id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const deleteComments = async (req, res) => {
    try {
        const { error } = joi.object({ ids }).validate(req.query);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.deleteComments(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
}
import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { ids, id, user_id, post_id, tcontent, status_id } from "../helpers/joi_schema";
import * as joi from "joi";

export const listShares = async (req, res) => {
    try {
        const response = await services.listShares(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const createShare = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { error } = joi.object({ user_id, post_id, tcontent }).validate({user_id, ...req.body});
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.createShare(user_id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const updateShare = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { error } = joi.object({ id, user_id, tcontent, status_id }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.updateShare(user_id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const deleteShares = async (req, res) => {
    try {
        const { error } = joi.object({ ids }).validate(req.query);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.deleteShares(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
}
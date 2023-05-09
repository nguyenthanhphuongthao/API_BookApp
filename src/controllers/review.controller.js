import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { ids, id, user_id, book_id, tcontent, rate, status_id } from "../helpers/joi_schema";
import * as joi from "joi";

export const listReviews = async (req, res) => {
    try {
        const response = await services.listReviews(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const createReview = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { error } = joi.object({ user_id, book_id, tcontent, rate }).validate({user_id, ...req.body});
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.createReview(user_id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const updateReview = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { error } = joi.object({ id, user_id, book_id, tcontent, rate, status_id }).validate({user_id, ...req.body});
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.updateReview(user_id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const deleteReviews = async (req, res) => {
    try {
        const { error } = joi.object({ ids }).validate(req.query);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.deleteReviews(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
}
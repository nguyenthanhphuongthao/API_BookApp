import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { ids, id, user_id, book_id, location, current_page, highlights, bookmarks, status_id } from "../helpers/joi_schema";
import * as joi from "joi";

export const listHistories = async (req, res) => {
    try {
        const response = await services.listHistories(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        return internalServerError(res)
    }
};

export const createHistory = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { error } = joi.object({ user_id, book_id, location, current_page, highlights, bookmarks }).validate({user_id, ...req.body});
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.createHistory(user_id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const updateHistory = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { error } = joi.object({ user_id, book_id, location, current_page, highlights, bookmarks, status_id }).validate({user_id, ...req.body});
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.updateHistory(user_id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const deleteHistories = async (req, res) => {
    try {
        const { error } = joi.object({ ids }).validate(req.query);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.deleteHistories(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
}
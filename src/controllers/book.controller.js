import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { ids, id, title, author, description, page_number, image_url, link, category_id, publisher_id, status_id } from "../helpers/joi_schema";
import * as joi from "joi";

export const listBooks = async (req, res) => {
    try {
        const response = await services.listBooks(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const createBook = async (req, res) => {
    try {
        const { error } = joi.object({ title, author, description, page_number, image_url, link, category_id, publisher_id }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.createBook(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const updateBook = async (req, res) => {
    try {
        const { error } = joi.object({ id, title, author, description, page_number, image_url, link, category_id, publisher_id, status_id }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.updateBook(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const deleteBooks = async (req, res) => {
    try {
        const { error } = joi.object({ ids }).validate(req.query);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.deleteBooks(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
}
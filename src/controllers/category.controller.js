import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { ids, id, name } from "../helpers/joi_schema";
import * as joi from "joi";

export const listCategories = async (req, res) => {
    try {
        const response = await services.listCategories(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const createCategory = async (req, res) => {
    try {
        const { error } = joi.object({ name }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.createCategory(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { error } = joi.object({ id, name }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.updateCategory(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const deleteCategories = async (req, res) => {
    try {
        const { error } = joi.object({ ids }).validate(req.query);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.deleteCategories(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
}
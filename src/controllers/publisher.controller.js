import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { ids, id, name } from "../helpers/joi_schema";
import * as joi from "joi";

export const listPublishers = async (req, res) => {
    try {
        const response = await services.listPublishers(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const createPublisher = async (req, res) => {
    try {
        const { error } = joi.object({ name }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.createPublisher(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const updatePublisher = async (req, res) => {
    try {
        const { error } = joi.object({ id, name }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.updatePublisher(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const deletePublishers = async (req, res) => {
    try {
        const { error } = joi.object({ ids }).validate(req.query);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.deletePublishers(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
}
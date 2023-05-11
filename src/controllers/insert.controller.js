import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";

export const insertCategory = async (req, res) => {
    try {
        const response = await services.insertCategory();
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
}

export const insertRole = async (req, res) => {
    try {
        const response = await services.insertRole();
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
}

export const insertStatus = async (req, res) => {
    try {
        const response = await services.insertStatus();
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
}

export const insertPublisher = async (req, res) => {
    try {
        const response = await services.insertPublisher();
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
}

export const insertBook = async (req, res) => {
    try {
        const response = await services.insertBook();
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
}
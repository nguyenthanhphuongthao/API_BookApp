import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { ids, id, user_id, tcontent, status_id, image, book_id } from "../helpers/joi_schema";
import * as joi from "joi";
const cloudinary = require('cloudinary').v2;

export const listPosts = async (req, res) => {
    try {
        const response = await services.listPosts(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const createPost = async (req, res) => {
    try {
        const user_id = req.user.id;
        const file = req.file || null;
        const path = file?.path;
        const { error } = joi.object({ user_id, tcontent, image }).validate({user_id, ...req.body, image: path});
        if (error) {
            if (file) cloudinary.uploader.destroy(file.filename);
            return badRequest(error.details[0]?.message, res);
        }
        const response = await services.createPost(user_id, req.body, path);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const updatePost = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { error } = joi.object({ id, user_id, tcontent, status_id }).validate({user_id, ...req.body});
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.updatePost(user_id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const updateStatusPost = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { error } = joi.object({ id, status_id }).validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.updateStatusPost(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
};

export const deletePosts = async (req, res) => {
    try {
        const { error } = joi.object({ ids }).validate(req.query);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.deletePosts(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
}

export const shareBook = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { error } = joi.object({ user_id, book_id, tcontent, image }).validate({user_id, ...req.body});
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.shareBook(user_id, req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error)
        return internalServerError(res)
    }
}
import * as joi from "joi";

//user
//register - login
export const email = joi.string().email({minDomainSegments: 2, tlds: {allow: ['com']}});
export const password = joi.string().min(3).max(30).required();
export const full_name = joi.string().min(2).max(30).required();
export const phone_number = joi.string().length(10).allow(null);
export const token = joi.string().allow(null);
export const refresh_token = joi.string().required();
export const accessToken = joi.string().required();
export const otp = joi.number().integer().required();

//book
export const id = joi.number().integer().required();
export const ids = joi.array().items(id).required();
export const title = joi.string().required();
export const author = joi.string().required();
export const description = joi.string().required();
export const image_url = joi.string().required();
export const link = joi.string().required();
export const category_id = joi.number().integer().required();
export const publisher_id = joi.number().integer().required();
export const status_id = joi.number().integer().allow(null);

//category - publisher
export const name = joi.string().required();

//post
export const user_id = joi.number().integer().required();
export const content = joi.string().required();
export const image = joi.string().allow(null);
//book
export const page_number = joi.number().integer().required();

//like - comment - share
export const post_id = joi.number().integer().required();
export const tcontent = joi.string().required();

//history
export const book_id = joi.number().integer().required();
export const location = joi.string().allow(null);
export const current_page = joi.number().integer().allow(null);
export const highlights = joi.object().keys({
    highlights: joi.array().items(joi.object().keys({
        page: joi.number().integer().required(),
        text: joi.string().required()
    })).allow(null)
    }).allow(null);
export const bookmarks = joi.object().keys({
    bookmarks: joi.array().items(joi.object().keys({
        page: joi.number().integer().required(),
        text: joi.string().allow(null)
    })).allow(null)
    }).allow(null);

//review
export const rate = joi.number().integer().min(1).max(5).required();

//profile
export const avatar = joi.string().required();
import db from "../models";
import {readFileSync, promises as fsPromises} from 'fs';
import { arr_book } from "../../book.data";

const arr_category = [
    { "name" : "Tâm Lý - Kỹ Năng" },
    { "name" : "Tôn Giáo - Tâm Linh" },
    { "name" : "Kiến Trúc - Xây Dựng" },
    { "name" : "Quản Trị - Kinh Doanh" },
    { "name" : "Lịch Sử - Quân Sự" },
    { "name" : "Y Học - Sức Khỏe" },
    { "name" : "Tử Vi - Phong Thủy" },
    { "name" : "Khoa Học - Kỹ Thuật" },
    { "name" : "Khai Tâm - Mở Trí" },
    { "name" : "Thể Thao - Võ Thuật" },
    { "name" : "Marketing - Bán Hàng" },
    { "name" : "Giáo Trình - Bài Giảng" },
    { "name" : "Khám Phá - Bí Ẩn" },
    { "name" : "Huyền Bí - Giả Tưởng" },
    { "name" : "Ẩm Thực - Nấu Ăn" },
    { "name" : "Cổ Tích - Thần Thoại" },
    { "name" : "Truyện Ngắn - Tiểu Thuyết" },
    { "name" : "Nông - Lâm - Ngư" },
    { "name" : "Phát Triển Bản Thân" },
    { "name" : "Công Nghệ Thông Tin" },
    { "name" : "Hồi Ký - Tùy Bút" },
    { "name" : "Triết Học - Lý Luận" },
    { "name" : "Văn Học - Nghệ Thuật" },
    { "name" : "Giáo Dục - Đào Tạo" }
    ]

const arr_role = [
    { "value" : "admin" },
    { "value" : "unverify" },
    { "value" : "customer" },
    ]

const arr_status = [
    { "code" : "B01", "value" : "Activated" },
    { "code" : "B02", "value" : "Deactivated" },
    { "code" : "H01", "value" : "Unread" },
    { "code" : "H02", "value" : "Reading" },
    { "code" : "H03", "value" : "Done" },
    { "code" : "P01", "value" : "Posted" },
    { "code" : "P02", "value" : "Hided" },
    { "code" : "P03", "value" : "Deleted" },
]

const arr_publisher = [
    { "name" : "Trẻ" },
    { "name" : "Văn Học" },
    { "name" : "Hội Nhà Văn" },
    { "name" : "Lao Động" },
    { "name" : "Hồng Đức" },
    { "name" : "Văn Hóa Sài Gòn" },
    { "name" : "Lao Động Xã Hội" },
    { "name" : "Tổng Hợp" }
]


export const insertCategory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.bulkCreate(arr_category);

      resolve({
        err: response ? 0 : -1,
        message: response ? "Insert category successfully" : "Insert category fail",
      });
    } catch (error) {
      reject(error);
    }
  });

export const insertRole = () =>
    new Promise(async (resolve, reject) => {
        try {
        const response = await db.Role.bulkCreate(arr_role);
    
        resolve({
            err: response ? 0 : -1,
            message: response ? "Insert role successfully" : "Insert role fail",
        });
        } catch (error) {
        reject(error);
        }
    });

export const insertStatus = () =>
    new Promise(async (resolve, reject) => {
        try {
        const response = await db.Status.bulkCreate(arr_status);
    
        resolve({
            err: response ? 0 : -1,
            message: response ? "Insert status successfully" : "Insert status fail",
        });
        } catch (error) {
        reject(error);
        }
    });
  
export const insertPublisher = () =>
    new Promise(async (resolve, reject) => {
        try {
        const response = await db.Publisher.bulkCreate(arr_publisher);
    
        resolve({
            err: response ? 0 : -1,
            message: response ? "Insert publisher successfully" : "Insert publisher fail",
        });
        } catch (error) {
        reject(error);
        }
    });

export const insertBook = () =>
    new Promise(async (resolve, reject) => {
        try {
        const response = await db.Book.bulkCreate(arr_book);
    
        resolve({
            err: response ? 0 : -1,
            message: response ? "Insert book successfully" : "Insert book fail",
        });
        } catch (error) {
        reject(error);
        }
    });

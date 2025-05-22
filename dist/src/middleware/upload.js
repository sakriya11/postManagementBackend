"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfFileFilter = exports.ImageFileFilter = exports.storage = exports.MAX_IMAGE_SIZE = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.MAX_IMAGE_SIZE = 5 * 1024 * 1024; //5MB
const storage = (uploadPath) => {
    return multer_1.default.diskStorage({
        destination(req, file, cb) {
            try {
                const upload_folder = `uploads/${uploadPath}`;
                if (!fs_1.default.existsSync(upload_folder)) {
                    fs_1.default.mkdirSync(upload_folder, { recursive: true });
                }
            }
            catch (error) {
                console.error(error);
                cb(new Error("Error with storage"), `uploads/${uploadPath}`);
            }
            cb(null, `uploads/${uploadPath}`);
        },
        filename(req, file, cb) {
            cb(null, `${file.originalname}`);
        },
    });
};
exports.storage = storage;
const ImageFileFilter = (req, file, cb) => {
    const filetypes = /jpg|jpeg|png|svg/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        const error = new Error("Images only!");
        error.status = 409;
        error.fieldname = file.fieldname;
        cb(error);
    }
};
exports.ImageFileFilter = ImageFileFilter;
const PdfFileFilter = (req, file, cb) => {
    const filetypes = /pdf/;
    const whiteLists = ["application/pdf"];
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = whiteLists.includes(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        const error = new Error("Pdf files only!");
        error.status = 409;
        error.fieldname = file.fieldname;
        cb(error);
    }
};
exports.PdfFileFilter = PdfFileFilter;
//# sourceMappingURL=upload.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controller/userController"));
const express_1 = require("express");
const authValidation_1 = __importDefault(require("../middleware/validators/authValidation"));
const validators_1 = require("../middleware/validators");
const multer_1 = __importDefault(require("multer"));
const upload_1 = require("../middleware/upload");
const content_1 = __importDefault(require("../controller/content"));
const uploadController_1 = __importDefault(require("../controller/uploadController"));
const userRouter = (0, express_1.Router)();
userRouter
    .post("/create/user", authValidation_1.default.register, validators_1.validate, userController_1.default.userRegistration)
    .post("/login", authValidation_1.default.login, validators_1.validate, userController_1.default.login)
    .post("/user/email/verification", userController_1.default.emailVerification)
    .post("/face/registration", (0, multer_1.default)({
    storage: (0, upload_1.storage)("img"),
    fileFilter: upload_1.ImageFileFilter,
    limits: { fileSize: upload_1.MAX_IMAGE_SIZE },
}).single("image"), userController_1.default.faceRegistration)
    .post("/face/login", (0, multer_1.default)({
    fileFilter: upload_1.ImageFileFilter,
    limits: { fileSize: upload_1.MAX_IMAGE_SIZE },
}).single("image"), userController_1.default.faceLogin)
    .get("/view/img-content/:role", content_1.default.viewRoleBasedImgContent)
    .get("/view/pdf-content/:role", content_1.default.viewRoleBasedPdfContent)
    .post("/generate/text", uploadController_1.default.generateText)
    .post("/upload/image", (0, multer_1.default)({
    storage: (0, upload_1.storage)("img"),
    fileFilter: upload_1.ImageFileFilter,
    limits: { fileSize: upload_1.MAX_IMAGE_SIZE },
}).single("image"), uploadController_1.default.formUploadWithImage)
    .post("/upload/pdf", (0, multer_1.default)({
    storage: (0, upload_1.storage)("pdf"),
    fileFilter: upload_1.PdfFileFilter,
}).single("pdf"), uploadController_1.default.uploadPdf);
exports.default = userRouter;
//# sourceMappingURL=user.js.map
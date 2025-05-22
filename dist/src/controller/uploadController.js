"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uploadServices_1 = require("../services/uploadServices");
const cohere_1 = require("../services/cohere");
const uploadController = {
    formUploadWithImage: (req, res) => (0, uploadServices_1.handleUpload)({
        req,
        res,
        fileKey: "img",
        successMessage: "Image uploaded successfully",
    }),
    uploadPdf: (req, res) => (0, uploadServices_1.handleUpload)({
        req,
        res,
        fileKey: "pdf",
        successMessage: "PDF uploaded successfully",
    }),
    generateText: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const text = req.body.text;
            const generatedText = yield (0, cohere_1.generateAiText)(text);
            res.status(200).send({
                ok: true,
                generatedText,
            });
            return;
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }),
};
exports.default = uploadController;
//# sourceMappingURL=uploadController.js.map
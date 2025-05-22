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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpload = void 0;
const upload_1 = __importDefault(require("../models/upload"));
const handleUpload = (_a) => __awaiter(void 0, [_a], void 0, function* ({ req, res, fileKey, successMessage, }) {
    try {
        const { title, date, description, role } = req.body;
        const file = req.file;
        // const user = (req as IReqUser).user;
        console.log("role", role);
        if (!file) {
            res.status(404).send({
                ok: false,
                message: "File not found",
            });
            return;
        }
        const uploadData = {
            title,
            date,
            description,
            // user: user._id,
            [fileKey]: file.path,
            role
        };
        const upload = yield upload_1.default.create(uploadData);
        res.status(200).send({
            ok: true,
            message: successMessage,
            data: upload,
        });
    }
    catch (error) {
        console.error("upload_error", error);
        res.status(500).send({
            msg: "Error in upload",
        });
    }
});
exports.handleUpload = handleUpload;
//# sourceMappingURL=uploadServices.js.map
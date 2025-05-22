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
const content_1 = require("../services/content");
const contentController = {
    viewRoleBasedImgContent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let finalData = [];
            const userRole = req.params.role;
            const content = yield (0, content_1.viewRoleBasedContent)(userRole, "pdf");
            if (!content || content.length === 0) {
                res.status(404).send({
                    ok: false,
                    message: "No content found",
                });
                return;
            }
            content.forEach((data) => {
                if (data.img) {
                    finalData.push(data);
                    return;
                }
            });
            res.status(200).send({
                ok: true,
                finalData,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                ok: false,
                message: "Error in viewing image content",
            });
        }
    }),
    viewRoleBasedPdfContent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let finalData = [];
            const userRole = req.params.role;
            const content = yield (0, content_1.viewRoleBasedContent)(userRole, "img");
            if (!content || content.length === 0) {
                res.status(404).send({
                    ok: false,
                    message: "No content found",
                });
                return;
            }
            content.forEach((data) => {
                if (data.pdf) {
                    finalData.push(data);
                    return;
                }
            });
            res.status(200).send({
                ok: true,
                finalData,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                ok: false,
                message: "Error in viewing PDF content",
            });
        }
    }),
    adminDeleteContent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const role = req.user.role;
            if (role !== "admin") {
                res.status(403).send({
                    ok: false,
                    message: "not authorized",
                });
            }
            yield (0, content_1.deleteContent)(id);
            res.status(200).send({
                ok: true,
                message: "Content deleted",
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                ok: false,
                message: "Error deleting the content",
            });
        }
    }),
};
exports.default = contentController;
//# sourceMappingURL=content.js.map
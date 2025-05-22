"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const content_1 = __importDefault(require("../../controller/content"));
const uploadRouter = (0, express_1.Router)();
uploadRouter
    .delete('/delete/:id', content_1.default.adminDeleteContent);
exports.default = uploadRouter;
//# sourceMappingURL=upload.js.map
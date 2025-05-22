"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("./upload"));
const adminRoutes = (0, express_1.default)();
adminRoutes.use(upload_1.default);
exports.default = adminRoutes;
//# sourceMappingURL=index.js.map
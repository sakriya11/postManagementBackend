"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const admin_1 = __importDefault(require("./admin"));
const auth_1 = __importDefault(require("../middleware/auth"));
const routes = (0, express_1.default)();
routes.use(user_1.default);
routes.use("/admin", auth_1.default.verifyToken, auth_1.default.hasRole(["admin"]), admin_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map
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
exports.deleteContent = exports.viewRoleBasedContent = void 0;
const upload_1 = __importDefault(require("../models/upload"));
const viewRoleBasedContent = (role, excludeField) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (role === "teacher")
        query = { role: "admin" };
    else if (role === "child")
        query = { role: "teacher" };
    const content = upload_1.default.find(query || {}) // if query is empty, find all (admin)
        .select(`-${excludeField}`);
    return yield content;
});
exports.viewRoleBasedContent = viewRoleBasedContent;
const deleteContent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield upload_1.default.findOneAndDelete({ _id: id });
});
exports.deleteContent = deleteContent;
//# sourceMappingURL=content.js.map
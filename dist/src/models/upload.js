"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uploadSchema = new mongoose_1.Schema({
    pdf: String,
    img: String,
    title: String,
    role: String,
    date: String,
    description: String
}, { timestamps: true });
const upload = (0, mongoose_1.model)("upload", uploadSchema);
exports.default = upload;
//# sourceMappingURL=upload.js.map
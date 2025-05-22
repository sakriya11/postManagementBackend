"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullname: String,
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
    },
    password: String,
    emailVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["admin", "teacher", "child"],
        default: "child",
    },
    faceImgUrl: String,
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map
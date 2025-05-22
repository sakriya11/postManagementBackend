"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const authValidator = {
    register: [
        (0, express_validator_1.body)("email")
            .isEmail()
            .withMessage("Email must be a valid email")
            .normalizeEmail(),
        (0, express_validator_1.body)("password")
            .isLength({ min: 8 })
            .withMessage("Password is minimum 8 chars long."),
    ],
    login: [
        (0, express_validator_1.body)("email")
            .isEmail()
            .withMessage("Email must be a valid email")
            .normalizeEmail(),
        (0, express_validator_1.body)("password")
            .isLength({ min: 8 })
            .withMessage("Password is minimum 8 chars long."),
    ],
};
exports.default = authValidator;
//# sourceMappingURL=authValidation.js.map
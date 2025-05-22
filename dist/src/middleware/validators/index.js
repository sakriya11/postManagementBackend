"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        next();
        return;
    }
    const message = errors.array()[0].msg;
    res.status(422).send({
        ok: false,
        code: "validation_error",
        message: message,
    });
};
exports.validate = validate;
//# sourceMappingURL=index.js.map
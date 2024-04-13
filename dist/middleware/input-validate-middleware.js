"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidaionMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidaionMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.inputValidaionMiddleware = inputValidaionMiddleware;

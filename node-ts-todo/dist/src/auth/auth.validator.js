"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.authCreateValidator = void 0;
const express_validator_1 = require("express-validator");
exports.authCreateValidator = [
    (0, express_validator_1.body)('name')
        .not()
        .isEmpty()
        .withMessage('The user name is mandatory')
        .trim()
        .isString()
        .withMessage('Name needs to be in text format'),
    (0, express_validator_1.body)('email')
        .not()
        .isEmpty()
        .withMessage('The user email is mandatory')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email needs to be in a valid email format'),
    (0, express_validator_1.body)('password')
        .not()
        .isEmpty()
        .withMessage('The user password is mandatory')
        .isLength({ min: 8 })
        .withMessage('Password needs to be at least 8 characters long'),
];
exports.loginValidator = [
    (0, express_validator_1.body)('email')
        .not()
        .isEmpty()
        .withMessage('The user email is mandatory')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email needs to be in a valid email format'),
    (0, express_validator_1.body)('password')
        .not()
        .isEmpty()
        .withMessage('The user password is mandatory')
        .isLength({ min: 8 })
        .withMessage('Password needs to be at least 8 characters long'),
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidator = exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
const Status_1 = require("../enums/Status");
const Priority_1 = require("../enums/Priority");
exports.createValidator = [
    (0, express_validator_1.body)('title')
        .not()
        .isEmpty()
        .withMessage('The task title is mandatory')
        .trim()
        .isString()
        .withMessage('Title needs to be in text format'),
    (0, express_validator_1.body)('date')
        .not()
        .isEmpty()
        .withMessage('The task date is mandatory')
        .isString()
        .withMessage('Date needs to be in a valid date format'),
    (0, express_validator_1.body)('description')
        .not()
        .isEmpty()
        .isString()
        .withMessage('The task description should be a string'),
    (0, express_validator_1.body)('status')
        .not()
        .isEmpty()
        .trim()
        .isIn([Status_1.Status.todo, Status_1.Status.inProgress, Status_1.Status.completed])
        .withMessage('Status can only be TODO, IN_PROGRESS, or COMPLETED'),
    (0, express_validator_1.body)('priority')
        .not()
        .isEmpty()
        .trim()
        .isIn([Priority_1.Priority.normal, Priority_1.Priority.high, Priority_1.Priority.low])
        .withMessage('Priority can only be NORMAL, HIGH, or LOW'),
];
exports.updateValidator = [
    (0, express_validator_1.body)('id')
        .not()
        .notEmpty()
        .withMessage('The task id is mandatory')
        .trim()
        .isString()
        .withMessage('ID needs to be valid uuid format'),
    (0, express_validator_1.body)('status')
        .not()
        .isEmpty()
        .trim()
        .isIn([Status_1.Status.todo, Status_1.Status.inProgress, Status_1.Status.completed])
        .withMessage('Status can only be TODO, IN_PROGRESS, or COMPLETED'),
];

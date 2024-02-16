import { ValidationChain, body } from 'express-validator'
import { Status } from '../enums/Status'
import { Priority } from '../enums/Priority'

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task title is mandatory')
    .trim()
    .isString()
    .withMessage('Title needs to be in text format'),

  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date is mandatory')
    .isString()
    .withMessage('Date needs to be in a valid date format'),

  body('description')
    .not()
    .isEmpty()
    .isString()
    .withMessage('The task description should be a string'),

  body('status')
    .not()
    .isEmpty()
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Status can only be TODO, IN_PROGRESS, or COMPLETED'),

  body('priority')
    .not()
    .isEmpty()
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage('Priority can only be NORMAL, HIGH, or LOW'),
]

export const updateValidator = [
  body('id')
    .not()
    .notEmpty()
    .withMessage('The task id is mandatory')
    .trim()
    .isString()
    .withMessage('ID needs to be valid uuid format'),

  body('status')
    .not()
    .isEmpty()
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Status can only be TODO, IN_PROGRESS, or COMPLETED'),
]

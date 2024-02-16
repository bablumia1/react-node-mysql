import { ValidationChain, body } from 'express-validator'

export const authCreateValidator: ValidationChain[] = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('The user name is mandatory')
    .trim()
    .isString()
    .withMessage('Name needs to be in text format'),

  body('email')
    .not()
    .isEmpty()
    .withMessage('The user email is mandatory')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email needs to be in a valid email format'),

  body('password')
    .not()
    .isEmpty()
    .withMessage('The user password is mandatory')
    .isLength({ min: 8 })
    .withMessage('Password needs to be at least 8 characters long'),
]

export const loginValidator = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('The user email is mandatory')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email needs to be in a valid email format'),

  body('password')
    .not()
    .isEmpty()
    .withMessage('The user password is mandatory')
    .isLength({ min: 8 })
    .withMessage('Password needs to be at least 8 characters long'),
]

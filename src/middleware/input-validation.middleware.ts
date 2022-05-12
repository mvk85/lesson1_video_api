import { body } from "express-validator";

export const validationTitle = body('title')
    .isString()
    .withMessage('field should be a string')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('lenght should be between 3 and 50');
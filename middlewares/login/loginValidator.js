import { check, validationResult } from "express-validator";


/**
 * add user validator
 */
export const userLoginValidators = [
    check("email")
        .notEmpty()
        .withMessage("Email/Phone required!")
        .trim(),
    check("password")
        .notEmpty()
        .withMessage("Password required!")
];

/**
 * mapped validation error
 */
export const userLoginValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(400).json({
            errors: mappedErrors
        });
    }

}
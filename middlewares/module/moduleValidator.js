import { check, validationResult } from "express-validator";


/**
 * add user validator
 */
export const addModuleValidators = [
    check("type")
        .optional()
        .isIn(['1', '2'])
        .withMessage("Type must be 1 and 2!")
        .trim(),
    check("module_name")
        .isLength({ min: 1 })
        .withMessage("Module name is required!")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Module name must not contain anything other than alphabet!")
        .trim(),
    check('url')
        .notEmpty()
        .withMessage('Url required!')
        .trim(),
    check("divider_title")
        .optional()
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Divider title must not contain anything other than alphabet!")
        .trim(),
    check('target')
        .optional()
        .isIn(['_self', '_blank'])
        .withMessage("Target must be _self or blank!")
        .trim()
];

/**
 * mapped validation error
 */
export const addModuleValidationHandler = function (req, res, next) {
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
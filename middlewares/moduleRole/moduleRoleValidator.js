import { check, validationResult } from "express-validator";

/**
 * add user validator
 */
export const addModuleRoleValidators = [
    check("module_id")
        .notEmpty()
        .withMessage("Module required!")
        .trim(),
    check("role_id")
        .notEmpty()
        .withMessage("Role required!")
        .trim(),
];

/**
 * mapped validation error
 */
export const addModuleRoleValidationHandler = function (req, res, next) {
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
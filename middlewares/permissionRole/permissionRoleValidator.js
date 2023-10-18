import { check, validationResult } from "express-validator";

/**
 * add user validator
 */
export const addPermissionRoleValidators = [
    check("permission_id")
        .notEmpty()
        .withMessage("Permission required!")
        .trim(),
    check("role_id")
        .notEmpty()
        .withMessage("Role required!")
        .trim(),
];

/**
 * mapped validation error
 */
export const addPermissionRoleValidationHandler = function (req, res, next) {
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
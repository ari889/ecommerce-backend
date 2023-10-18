import { check, validationResult } from "express-validator";
import Permission from "../../models/Permission.js";
import { slug } from "../../helpers/Helper.js";
import createError from 'http-errors';


/**
 * add user validator
 */
export const addPermissionValidators = [
    check('module_id')
        .notEmpty()
        .withMessage('Module required!')
        .trim(),
    check("name")
        .isLength({ min: 1 })
        .withMessage("Permission name required!")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Permission name must not contain anything other than alphabet!")
        .trim(),
    check("slug")
        .notEmpty()
        .withMessage("Permission slug required!")
        .custom(async (value) => {
            try {
                const permissionSlug = slug(value.trim());
                const permission = await Permission.findOne({ slug: permissionSlug });
                if (permission) {
                    throw createError("Permission already exists!")
                }
            } catch (error) {
                throw createError(error.message);
            }
        })
        .trim()
];

/**
 * mapped validation error
 */
export const addPermissionValidationHandler = function (req, res, next) {
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

/**
 * add user validator
 */
export const updatePermissionValidators = [
    check("name")
        .optional()
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Permission name must not contain anything other than alphabet!")
        .trim(),
    check("slug")
        .optional()
        .custom(async (value, { req }) => {
            try {
                const permissionSlug = slug(value.trim());
                const permission = await Permission.findOne({ slug: permissionSlug, _id: { $ne: req?.params?.id } });
                if (permission) {
                    throw createError("Permission already exists!")
                }
            } catch (error) {
                throw createError(error.message);
            }
        })
        .trim()
];

/**
 * mapped validation error
 */
export const updatePermissionValidationHandler = function (req, res, next) {
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
import { check, validationResult } from "express-validator";
import Role from "../../models/Role.js";
import { slug } from "../../helpers/Helper.js";
import createError from 'http-errors';


/**
 * add user validator
 */
export const addRoleValidators = [
    check("role_name")
        .notEmpty()
        .withMessage("Enter role name!")
        .custom(async (value) => {
            try {
                const roleSlug = slug(value);
                const role = await Role.findOne({ slug: roleSlug });
                if (role) {
                    throw createError("Role already exists!")
                }
            } catch (error) {
                throw createError(error.message);
            }
        })
        .trim(),
    check("deletable")
        .isIn(['1', '2'])
        .withMessage("Please enter for deletable action!")
];

/**
 * mapped validation error
 */
export const addRoleValidationHandler = function (req, res, next) {
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
export const updateRoleValidators = [
    check("role_name")
        .notEmpty()
        .withMessage("Enter role name!")
        .custom(async (value, { req }) => {
            try {
                const roleSlug = slug(value);
                const role = await Role.findOne({ slug: roleSlug, _id: { $ne: req?.params?.id } });
                if (role) {
                    throw createError("Role already exists!")
                }
            } catch (error) {
                throw createError(error.message);
            }
        })
        .trim(),
    check("deletable")
        .isIn(['1', '2'])
        .withMessage("Please enter for deletable action!")
];

/**
 * mapped validation error
 */
export const updateRoleValidationHandler = function (req, res, next) {
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
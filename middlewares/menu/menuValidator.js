import { check, validationResult } from "express-validator";
import Menu from "../../models/Menu.js";
import { slug } from "../../helpers/Helper.js";
import createError from 'http-errors';


/**
 * add user validator
 */
export const addMenuValidators = [
    check("menu_name")
        .notEmpty()
        .withMessage("Enter menu name!")
        .custom(async (value) => {
            try {
                const menuSlug = slug(value);
                const menu = await Menu.findOne({ slug: menuSlug });
                if (menu) {
                    throw createError("Menu already exists!")
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
export const addMenuValidationHandler = function (req, res, next) {
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
export const updateMenuValidators = [
    check("menu_name")
        .notEmpty()
        .withMessage("Enter menu name!")
        .custom(async (value) => {
            try {
                const menuSlug = slug(value);
                const menu = await Menu.findOne({ slug: { $ne: menuSlug } });
                if (menu) {
                    throw createError("Menu already exists!")
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
export const updateMenuValidationHandler = function (req, res, next) {
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
import { check, validationResult } from "express-validator";
import createError from 'http-errors';
import User from "../../models/User.js";

/**
 * register validator
 */
export const registerValidators = [
    check('full_name')
        .isLength({ min: 1 })
        .withMessage("Name is required!")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Name must not contain anything other than alphabet!")
        .trim(),
    check('shop_name')
        .optional()
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Shop name must not contain anything other than alphabet")
        .trim(),
    check('phone')
        .isLength({ min: 11, max: 11 })
        .withMessage("Phone number must be 11 characters")
        .matches(/^(?:\+88|88)?(01[3-9]\d{8})$/)
        .withMessage("Must be a valid bangladeshi phone number")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ phone: value });
                if (user) {
                    throw createError("Phone already exists!")
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
    check('email')
        .isEmail()
        .withMessage("Must be a valid email!")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createError("Email already exists!");
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
    check('password')
        .notEmpty()
        .withMessage('Password required!')
        .isStrongPassword()
        .withMessage("Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"),
    check('password_confirmation')
        .custom((value, { req }) => {
            try {
                if (value !== req?.body?.password) {
                    throw new Error("Password not matched!")
                }

                return true;
            } catch (error) {
                throw new createError(error.message);
            }
        })
        .trim(),
    check('gender')
        .custom((value) => {
            try {
                if (value === null) {
                    return true;
                }

                if (['0', '1', '2'].includes(value)) {
                    return true;
                }

                throw createError("Invalid gender input!");
            } catch (error) {
                throw createError(error.message);
            }
        }),
    check('birthday')
        .optional()
        .isISO8601()
        .withMessage("Invalid birthday format!")
];

/**
 * mapped validation error
 */
export const registerValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(400).json({
            errors: mappedErrors
        })
    }
}
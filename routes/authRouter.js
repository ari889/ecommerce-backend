import express from "express";
import { registerValidationHandler, registerValidators } from "../middlewares/register/registerValidator.js";
import { registerController } from "../controllers/register/registerController.js";
import { userLoginValidationHandler, userLoginValidators } from "../middlewares/login/loginValidator.js";
import { loginController } from "../controllers/login/loginController.js";
/**
 * require express router
 */
const router = express.Router();

/**
 * register router
 */
router.post('/register', registerValidators, registerValidationHandler, registerController);

/**
 * login router
 */
router.post('/login', userLoginValidators, userLoginValidationHandler, loginController);

export default router;
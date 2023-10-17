/**
 * external imports
 */
import express from "express"

/**
 * internal imports
 */
import checkLogin from "../middlewares/auth/checkLogin.js";
import { addModuleValidationHandler, addModuleValidators } from "../middlewares/module/moduleValidator.js";
import { destroy, show, store, update } from "../controllers/module/moduleController.js";

/**
 * define router
 */
const router = express.Router();

/**
 * store Module
 */
router.post('/add/:menu_id', checkLogin, addModuleValidators, addModuleValidationHandler, store);

/**
 * get module by id
 */
router.get('/show/:id', checkLogin, show);

/**
 * update module by id
 */
router.patch('/update/:id', checkLogin, addModuleValidators, addModuleValidationHandler, update);

/**
 * delete module by id
 */
router.delete('/delete/:id', checkLogin, destroy);

export default router;
/**
 * external imports
 */
import express from "express"

/**
 * internal imports
 */
import checkLogin from "../middlewares/auth/checkLogin.js";
import { destroy, show, store, update } from "../controllers/moduleRole/moduleRoleController.js";
import { addModuleRoleValidationHandler, addModuleRoleValidators } from "../middlewares/moduleRole/moduleRoleValidator.js";

/**
 * define router
 */
const router = express.Router();

/**
 * store Role
 */
router.post('/add', checkLogin, addModuleRoleValidators, addModuleRoleValidationHandler, store);

/**
 * get Role by id
 */
router.get('/show/:id', checkLogin, show);

/**
 * update Role by id
 */
router.patch('/update/:id', checkLogin, addModuleRoleValidators, addModuleRoleValidationHandler, update);

/**
 * delete Role by id
 */
router.delete('/delete/:id', checkLogin, destroy);

export default router;
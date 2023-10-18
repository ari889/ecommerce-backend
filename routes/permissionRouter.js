/**
 * external imports
 */
import express from "express"

/**
 * internal imports
 */
import checkLogin from "../middlewares/auth/checkLogin.js";
import { addPermissionValidationHandler, addPermissionValidators, updatePermissionValidationHandler, updatePermissionValidators } from "../middlewares/permission/permissionValidator.js";
import { destroy, show, store, update } from "../controllers/permission/permissionController.js";

/**
 * define router
 */
const router = express.Router();

/**
 * store permission
 */
router.post('/add/:module_id', checkLogin, addPermissionValidators, addPermissionValidationHandler, store);

/**
 * get permission by id
 */
router.get('/show/:id', checkLogin, show);

/**
 * update permission by id
 */
router.patch('/update/:id', checkLogin, updatePermissionValidators, updatePermissionValidationHandler, update);

/**
 * delete permission by id
 */
router.delete('/delete/:id', checkLogin, destroy);

export default router;
/**
 * external imports
 */
import express from "express"

/**
 * internal imports
 */
import checkLogin from "../middlewares/auth/checkLogin.js";
import { destroy, show, store, update } from "../controllers/permissionRole/permissionRoleController.js";
import { addPermissionRoleValidationHandler, addPermissionRoleValidators } from "../middlewares/permissionRole/permissionRoleValidator.js";

/**
 * define router
 */
const router = express.Router();

/**
 * store Role
 */
router.post('/add', checkLogin, addPermissionRoleValidators, addPermissionRoleValidationHandler, store);

/**
 * get Role by id
 */
router.get('/show/:id', checkLogin, show);

/**
 * update Role by id
 */
router.patch('/update/:id', checkLogin, addPermissionRoleValidators, addPermissionRoleValidationHandler, update);

/**
 * delete Role by id
 */
router.delete('/delete/:id', checkLogin, destroy);

export default router;
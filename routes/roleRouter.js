/**
 * external imports
 */
import express from "express"

/**
 * internal imports
 */
import checkLogin from "../middlewares/auth/checkLogin.js";
import { addRoleValidationHandler, addRoleValidators, updateRoleValidationHandler, updateRoleValidators } from "../middlewares/role/roleValidator.js";
import { destroy, show, store, update } from "../controllers/role/roleController.js";

/**
 * define router
 */
const router = express.Router();

/**
 * store Role
 */
router.post('/add', checkLogin, addRoleValidators, addRoleValidationHandler, store);

/**
 * get Role by id
 */
router.get('/show/:id', checkLogin, show);

/**
 * update Role by id
 */
router.patch('/update/:id', checkLogin, updateRoleValidators, updateRoleValidationHandler, update);

/**
 * delete Role by id
 */
router.delete('/delete/:id', checkLogin, destroy);

export default router;
/**
 * external imports
 */
import express from "express"

/**
 * internal imports
 */
import checkLogin from "../middlewares/auth/checkLogin.js";
import { addMenuValidationHandler, addMenuValidators, updateMenuValidationHandler, updateMenuValidators } from "../middlewares/menu/menuValidator.js";
import { destroy, show, store, update } from "../controllers/menu/menuController.js";

/**
 * define router
 */
const router = express.Router();

/**
 * store menu
 */
router.post('/add', checkLogin, addMenuValidators, addMenuValidationHandler, store);

/**
 * get menu by id
 */
router.get('/show/:id', checkLogin, show);

/**
 * update menu by id
 */
router.patch('/update/:id', checkLogin, updateMenuValidators, updateMenuValidationHandler, update);

/**
 * delete menu by id
 */
router.delete('/delete/:id', checkLogin, destroy);

export default router;
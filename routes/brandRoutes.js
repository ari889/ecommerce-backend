/**
 * external imports
 */
import express from "express"

/**
 * internal imports
 */
import checkLogin from "../middlewares/auth/checkLogin.js";
import { addBrandValidationHandler, addBrandValidators } from "../middlewares/brand/brandValidator.js";
import { destroy, show, store, update } from "../controllers/brand/brandController.js";

/**
 * define router
 */
const router = express.Router();

/**
 * store brand
 */
router.post('/add', checkLogin, addBrandValidators, addBrandValidationHandler, store);

/**
 * get brand by id
 */
router.get('/show/:id', checkLogin, show);

/**
 * update brand by id
 */
router.patch('/update/:id', checkLogin, updateBrandValidators, updateBrandValidationHandler, update);

/**
 * delete brand by id
 */
router.delete('/delete/:id', checkLogin, destroy);

export default router;
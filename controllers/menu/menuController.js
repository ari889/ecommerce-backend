import { commonErr, populateUser, slug } from "../../helpers/Helper.js";
import Menu from "../../models/Menu.js";
import createError from 'http-errors';


/**
 * Add new menu
 * @param {*} req 
 * @param {*} res 
 */
export const store = async (req, res) => {
    try {
        const { menu_name, deletable } = req.body;

        const newMenu = new Menu(populateUser(req, {
            menu_name,
            deletable,
            slug: slug(menu_name)
        }));

        await newMenu.save();
        res.status(200).json({
            success: {
                common: "Menu added"
            }
        });
    } catch (error) {
        commonErr(error.message);
    }
}

/**
 * edit menu
 */
export const show = async (req, res) => {
    const { id } = req?.params;

    try {
        const menu = await Menu.findById(id).select('menu_name deletable _id');
        if (menu) {
            res.status(200).json(menu);
        } else {
            throw createError("Menu not found!");
        }
    } catch (error) {
        commonErr(error, res);
    }
}

/**
 * update menu
 */
export const update = async (req, res) => {
    const { id } = req.params;
    const populatedData = populateUser(req, req?.body, 'update');

    try {
        await Menu.updateOne({ _id: id }, populatedData);

        res.status(200).json({
            success: {
                common: "Menu updated!"
            }
        });
    } catch (error) {
        commonErr(error.message);
    }
}

/**
 * delete menu
 */
export const destroy = async (req, res) => {
    const { id } = req?.params;

    try {
        await Menu.findOneAndDelete({ _id: id });

        res.status(200).json({
            success: {
                common: "Menu deleted!"
            }
        });
    } catch (error) {
        commonErr(error.message);
    }
}
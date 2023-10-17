/**
 * internal imports
 */
import { commonErr, populateUser } from "../../helpers/Helper.js";
import Module from "../../models/Module.js";
import createError from 'http-errors';


/**
 * Add new role
 * @param {*} req 
 * @param {*} res 
 */
export const store = async (req, res) => {
    try {
        const { menu_id } = req?.params;

        const newModule = new Module(populateUser(req, {
            ...req?.body,
            menu_id
        }));

        await newModule.save();
        res.status(200).json({
            success: {
                common: "Module added"
            }
        });
    } catch (error) {
        commonErr(error.message, res);
    }
}

/**
 * edit module
 */
export const show = async (req, res) => {
    const { id } = req?.params;

    try {
        const module = await Module.findById(id)
            .select('menu_id type module_name url divider_title icon_class parent_id target')
            .populate({
                path: 'menu_id',
                select: "_id menu_name slug deletable"
            })
            .populate({
                path: "parent_id",
                options: { optional: true },
                select: "_id module_name url"
            });
        if (module) {
            res.status(200).json(module);
        } else {
            throw createError("Module not found!");
        }
    } catch (error) {
        commonErr(error.message, res);
    }
}

/**
 * update module
 */
export const update = async (req, res) => {
    const { id } = req.params;
    const populatedData = populateUser(req, req?.body, 'update');

    try {
        await Module.updateOne({ _id: id }, populatedData);

        res.status(200).json({
            success: {
                common: "Module updated!"
            }
        });
    } catch (error) {
        commonErr(error.message, res);
    }
}

/**
 * delete module
 */
export const destroy = async (req, res) => {
    const { id } = req?.params;

    try {
        await Module.findOneAndDelete({ _id: id });

        await Module.deleteMany({ parent_id: id });

        res.status(200).json({
            success: {
                common: "Module deleted!"
            }
        });
    } catch (error) {
        commonErr(error.message, res);
    }
}
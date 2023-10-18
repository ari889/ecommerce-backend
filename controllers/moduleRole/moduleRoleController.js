/**
 * internal imports
 */
import { commonErr, populateUser, slug } from "../../helpers/Helper.js";
import ModuleRole from "../../models/ModuleRole.js";
import createError from 'http-errors';


/**
 * Add new role
 * @param {*} req 
 * @param {*} res 
 */
export const store = async (req, res) => {
    try {
        const { module_id, role_id } = req?.body;

        const newModuleRole = new ModuleRole(populateUser(req, {
            module_id,
            role_id
        }));

        await newModuleRole.save();

        res.status(200).json({
            success: {
                common: "Module role assigned!"
            }
        });
    } catch (error) {
        commonErr(error.message, res);
    }
}

/**
 * edit role
 */
export const show = async (req, res) => {
    const { id } = req?.params;

    try {
        const role = await ModuleRole.findById(id)
            .populate({
                path: "module_id",
                select: "_id module_name type divider_title url icon_class order target"
            })
            .populate({
                path: "role_id",
                select: "_id role_name slug"
            });
        if (role) {
            res.status(200).json(role);
        } else {
            throw createError("Role not found!");
        }
    } catch (error) {
        commonErr(error, res);
    }
}

/**
 * update role
 */
export const update = async (req, res) => {
    const { id } = req.params;
    const populatedData = populateUser(req, req?.body, 'update');

    try {
        await ModuleRole.updateOne({ _id: id }, populatedData);

        res.status(200).json({
            success: {
                common: "Module role reassigned!"
            }
        });
    } catch (error) {
        commonErr(error.message, res);
    }
}

/**
 * delete role
 */
export const destroy = async (req, res) => {
    const { id } = req?.params;

    try {
        await ModuleRole.findOneAndDelete({ _id: id });

        res.status(200).json({
            success: {
                common: "Module role removed!"
            }
        });
    } catch (error) {
        commonErr(error.message);
    }
}
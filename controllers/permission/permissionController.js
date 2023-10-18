/**
 * internal imports
 */
import { commonErr, populateUser, slug } from "../../helpers/Helper.js";
import Permission from "../../models/Permission.js";
import createError from 'http-errors';


/**
 * Add new permission
 * @param {*} req 
 * @param {*} res 
 */
export const store = async (req, res) => {
    try {
        const { module_id } = req?.params;
        const { name, slug } = req?.body;

        const newPermission = new Permission(populateUser(req, {
            module_id,
            name,
            slug
        }));

        await newPermission.save();
        res.status(200).json({
            success: {
                common: "Permission added"
            }
        });
    } catch (error) {
        commonErr(error.message);
    }
}

/**
 * edit permission
 */
export const show = async (req, res) => {
    const { id } = req?.params;

    try {
        const permission = await Permission.findById(id)
            .populate({
                path: "module_id",
                select: "_id menu_id type module_name url divider_title icon_class order parent_id target"
            })
            .select('name module_id slug _id');
        if (permission) {
            res.status(200).json(permission);
        } else {
            throw createError("Role not found!");
        }
    } catch (error) {
        commonErr(error, res);
    }
}

/**
 * update permission
 */
export const update = async (req, res) => {
    const { id } = req?.params;
    const populatedData = populateUser(req, req?.body, 'update');

    try {
        await Permission.updateOne({ _id: id }, populatedData);

        res.status(200).json({
            success: {
                common: "Permission updated!"
            }
        });
    } catch (error) {
        commonErr(error.message);
    }
}

/**
 * delete permission
 */
export const destroy = async (req, res) => {
    const { id } = req?.params;

    try {
        await Permission.findOneAndDelete({ _id: id });

        res.status(200).json({
            success: {
                common: "Permission deleted!"
            }
        });
    } catch (error) {
        commonErr(error.message);
    }
}
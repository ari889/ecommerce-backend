/**
 * internal imports
 */
import { commonErr, populateUser } from "../../helpers/Helper.js";
import PermissionRole from "../../models/PermissionRole.js";
import createError from 'http-errors';


/**
 * Add new permission role
 * @param {*} req 
 * @param {*} res 
 */
export const store = async (req, res) => {
    try {
        const { permission_id, role_id } = req?.body;

        const newPermissionRole = new PermissionRole(populateUser(req, {
            permission_id,
            role_id
        }));

        await newPermissionRole.save();

        res.status(200).json({
            success: {
                common: "Permission role assigned!"
            }
        });
    } catch (error) {
        commonErr(error.message, res);
    }
}

/**
 * edit permission role
 */
export const show = async (req, res) => {
    const { id } = req?.params;

    try {
        const permissionRole = await PermissionRole.findById(id)
            .populate({
                path: "permission_id",
                select: "_id module_id name slug"
            })
            .populate({
                path: "role_id",
                select: "_id role_name slug"
            });
        if (permissionRole) {
            res.status(200).json(permissionRole);
        } else {
            throw createError("Permission role not found!");
        }
    } catch (error) {
        commonErr(error.message, res);
    }
}

/**
 * update permission role
 */
export const update = async (req, res) => {
    const { id } = req.params;
    const populatedData = populateUser(req, req?.body, 'update');

    try {
        await PermissionRole.updateOne({ _id: id }, populatedData);

        res.status(200).json({
            success: {
                common: "Permission role reassigned!"
            }
        });
    } catch (error) {
        commonErr(error.message, res);
    }
}

/**
 * delete permission role
 */
export const destroy = async (req, res) => {
    const { id } = req?.params;

    try {
        await PermissionRole.findOneAndDelete({ _id: id });

        res.status(200).json({
            success: {
                common: "Permission role removed!"
            }
        });
    } catch (error) {
        commonErr(error.message);
    }
}
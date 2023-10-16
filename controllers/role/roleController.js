/**
 * internal imports
 */
import { commonErr, populateUser, slug } from "../../helpers/Helper.js";
import Role from "../../models/Role.js";
import createError from 'http-errors';


/**
 * Add new role
 * @param {*} req 
 * @param {*} res 
 */
export const store = async (req, res) => {
    try {
        const { role_name, deletable } = req?.body;

        const newRole = new Role(populateUser(req, {
            role_name,
            deletable,
            slug: slug(role_name)
        }));

        await newRole.save();
        res.status(200).json({
            success: {
                common: "Role added"
            }
        });
    } catch (error) {
        commonErr(error.message);
    }
}

/**
 * edit role
 */
export const show = async (req, res) => {
    const { id } = req?.params;

    try {
        const role = await Role.findById(id).select('role_name deletable _id');
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
        await Role.updateOne({ _id: id }, populatedData);

        res.status(200).json({
            success: {
                common: "Role updated!"
            }
        });
    } catch (error) {
        commonErr(error.message);
    }
}

/**
 * delete role
 */
export const destroy = async (req, res) => {
    const { id } = req?.params;

    try {
        await Role.findOneAndDelete({ _id: id });

        res.status(200).json({
            success: {
                common: "Role deleted!"
            }
        });
    } catch (error) {
        commonErr(error.message);
    }
}
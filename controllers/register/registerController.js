import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

/**
 * register user
 */
export const registerController = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req?.body?.password, 10);

        const newUser = new User({
            full_name: req?.body?.full_name,
            shop_name: req?.body?.shop_name,
            phone: req?.body?.phone,
            email: req?.body?.email,
            password: hashedPassword,
            gender: req?.body?.gender,
            birthday: req?.body?.birthday,
        });

        const result = await newUser.save();

        const userObj = {
            full_name: result?.full_name,
            email: result?.email,
            phone: result?.phone,
            id: result?._id
        }

        const accessToken = jwt.sign(userObj, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY
        });

        res.status(200).json({
            accessToken,
            user: userObj
        })
    } catch (error) {
        res.status(500).json({
            errors: {
                common: error.message
            }
        })
    }
}
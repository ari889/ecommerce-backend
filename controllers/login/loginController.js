import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

/**
 * login user
 */
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            $or: [
                { email: email },
                { phone: email }
            ]
        });

        /**
         * check user exists
         */
        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            );

            /**
             * password validation
             */
            if (isValidPassword) {
                const userObj = {
                    full_name: user?.full_name,
                    email: user?.email,
                    phone: user?.phone,
                    id: user?._id
                }

                /**
                 * create access token
                 */
                const accessToken = jwt.sign(userObj, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY
                });

                /**
                 * send response
                 */
                res.status(200).json({
                    accessToken,
                    user: userObj
                });
            } else {
                res.status(401).json({
                    errors: {
                        common: "Invalid Password!"
                    }
                })
            }
        } else {
            res.status(404).json({
                errors: {
                    common: "User not found!"
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            errors: {
                common: error.message
            }
        })
    }
}
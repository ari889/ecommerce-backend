/**
 * 404 not found handler
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        errors: {
            common: "Your requested resource was not found!"
        }
    })
}

/**
 * common error handler
 */
export const commonErrorHandler = (err, req, res, next) => {
    const error = process.env.NODE_env === 'development' ? err : "Internal server error";
    res.status(500).json({
        errors: {
            common: error
        }
    })
}
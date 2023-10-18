/**
 * This function add created_by and updated_by data
 * @param {*} req 
 * @param {*} obj 
 * @returns 
 */
export const populateUser = (req, obj, action = 'store') => {
    const { id } = req?.user;

    const updatedObj = {
        ...obj,
        updated_by: id
    }

    const storeObj = {
        ...obj,
        created_by: id,
        updated_by: id
    }

    return action === 'store' ? storeObj : updatedObj;
}

/**
 * Slug maker
 * @param {*} text 
 * @returns 
 */
export const slug = (text) => {
    return text.replace(' ', '-').toLowerCase();
}

/**
 * common error response
 */
export const commonErr = (msg, res, code = 500) => {
    console.log(msg, res)
    return res.status(code).json({
        errors: {
            common: msg
        }
    });
}
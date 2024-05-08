const User = require("../../../models/User")

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const renderUsers = async (req, res, next) => {
    /**
     * Find all user data
     */
    const usersData = await User.find({});
    /**
     * Render it to front end
     */
    res.render('users', { usersData });
}

module.exports = renderUsers;
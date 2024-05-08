const User = require("../../../models/User");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const blockUser = async (req, res, next) => {
    const userId = req.params.userId;
    await User.findByIdAndUpdate(userId, {
        isBlocked: true,
    });
    /**
     * Sending status to AJAX
     */
    res.sendStatus(200);
}

module.exports = blockUser
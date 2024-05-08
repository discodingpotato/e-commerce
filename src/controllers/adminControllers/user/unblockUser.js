const User = require("../../../models/User");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const unblockUser = async (req, res, next) => {
    const userId = req.params.userId;
    await User.findByIdAndUpdate(userId, {
        isBlocked: false,
    });
    /**
     * Sending status to AJAX
     */
    res.sendStatus(200);
}

module.exports = unblockUser
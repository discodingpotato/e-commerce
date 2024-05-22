const User = require("../models/User")

const isBlocked = async (userId) => {
    const userDetails = await User.findById(userId);
    if(userDetails && userDetails.isBlocked) {
        return true;
    } else {
        return false
    }
}

module.exports = isBlocked
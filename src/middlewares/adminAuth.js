/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const isLogin = (req, res, next) => {
    if(req.session.adminId) {
        /**
         * Need to verify whether the user is admin or not;
         * because sessions can be edited easly : )
         */
        next()
    } else {
        res.redirect('/admin/login?redirect=' + req.url)
    }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const isLogout = (req, res, next) => {
    if(req.session.adminId) {
        res.redirect(req.baseUrl + '/dashboard');
    } else {
        next()
    }
}

module.exports = {
    isLogin,
    isLogout
}
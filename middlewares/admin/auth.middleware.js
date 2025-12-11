const Account = require('../../models/user.model');
const sysConfig = require('../../config/system')

module.exports.requireAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.flash("error", "Bạn cần đăng nhập!");
        return res.redirect(`${sysConfig.prefixAdmin}/auth/login`);
    }

    const user = await Account.findOne({ token, deleted: false });

    if (!user) {
        req.flash("error", "Phiên đăng nhập không hợp lệ!");
        return res.redirect(`${sysConfig.prefixAdmin}/auth/login`);
    }

    if (user.status === "inactive") {
        req.flash("error", "Tài khoản bị khóa!");
        return res.redirect(`${sysConfig.prefixAdmin}/auth/login`);
    }

    req.user = user;
    next();
};

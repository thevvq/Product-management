const Account = require('../../models/user.model');
const sysConfig = require('../../config/system');

module.exports.requireAuthClient = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            req.flash("error", "Bạn cần đăng nhập!");
            return res.redirect('/login');
        }

        const user = await Account.findOne({ token, deleted: false }).select('-password');

        if (!user) {
            req.flash("error", "Phiên đăng nhập không hợp lệ!");
            return res.redirect('/login');
        }

        res.locals.user = user;

        next();
    } catch (err) {
        console.error(err);
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại!");
        return res.redirect('/login');
    }
};

const sysConfig = require('../../config/system');

module.exports.createPost = (req, res, next) => {
    const { fullName, email, password, confirmPassword, phone, role_id } = req.body;

    // 1. Full name
    if (!fullName || fullName.trim().length < 2) {
        req.flash("error", "Họ tên không hợp lệ!");
        return res.redirect(`${sysConfig.prefixAdmin}/categories/create`);
    }

    // 2. Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        req.flash("error", "Email không hợp lệ!");
        return res.redirect(`${sysConfig.prefixAdmin}/accounts/create`);
    }

    // 3. Password check
    if (!password || password.length < 6) {
        req.flash("error", "Mật khẩu tối thiểu 6 ký tự!");
        return res.redirect(`${sysConfig.prefixAdmin}/accounts/create`);
    }

    // 4. Confirm password
    if (password !== confirmPassword) {
        req.flash("error", "Mật khẩu xác nhận không khớp!");
        return res.redirect(`${sysConfig.prefixAdmin}/accounts/create`);
    }

    // 5. Phone (optional)
    if (phone) {
        const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(phone)) {
            req.flash("error", "Số điện thoại không hợp lệ!");
            return res.redirect(`${sysConfig.prefixAdmin}/accounts/create`);
        }
    }

    // 6. Role check
    if (!role_id || role_id.trim() === "") {
        req.flash("error", "Vui lòng chọn phân quyền!");
        return res.redirect(`${sysConfig.prefixAdmin}/accounts/create`);
    }

    next();
};

const loginService = require("../../services/client/login.service");

module.exports = {
    renderLogin: (req, res) => {
        res.render("client/pages/auth/login", {
            pageTitle: "Đăng nhập"
        });
    },

    handleLogin: async (req, res) => {   
        try {
            await loginService.login(req, res);
            res.redirect("/");
            
        } catch (err) {
            switch (err.message) {
                case "EMAIL_NOT_FOUND":
                    return res.render("client/pages/auth/login", {
                        pageTitle: "Đăng nhập",
                        error: "Email không tồn tại!"
                    });

                case "PASSWORD_ERROR":
                    return res.render("client/pages/auth/login", {
                        pageTitle: "Đăng nhập",
                        error: "Mật khẩu không đúng!"
                    });

                default:
                    return res.render("client/pages/auth/login", {
                        pageTitle: "Đăng nhập",
                        error: "Có lỗi xảy ra, vui lòng thử lại!"
                    });
            }
        }
    },

    logout: (req, res) => {
        loginService.logout(req, res)

        res.redirect("/login");
    }
};

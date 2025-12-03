const User = require("../../models/user.model");

module.exports = {
    renderProfile: (req, res) => {
        if (!req.session.user) return res.redirect("/login");
        res.render("client/pages/profile/index", {
            title: "Thông tin tài khoản",
            user: req.session.user
        });
    },

    updateProfile: async (req, res) => {
        try {
            const user = req.session.user;

            let avatar = user.avatar;
            if (req.file) {
                avatar = "/uploads/avatar/" + req.file.filename;
            }

            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                {
                    fullName: req.body.fullName,
                    gender: req.body.gender,
                    birthday: req.body.birthday,
                    phone: req.body.phone,
                    address: req.body.address,
                    avatar: avatar
                },
                { new: true }
            );

            req.session.user = updatedUser;

            res.redirect("/profile");
        } catch (err) {
            res.send("Lỗi cập nhật: " + err.message);
        }
    }
};

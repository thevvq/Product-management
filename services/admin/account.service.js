const Account = require('../../models/user.model');
const Role = require('../../models/role.model');
const uploadToCloud = require("../../helper/uploadCloud");
const bcrypt = require("bcrypt");

module.exports.getList = async () => { 
    let find = {deleted: false} 
    return Account.find(find).select('-token -password') 
}

module.exports.create = async () => { 
    let find = {deleted: false}
    return Role.find(find) 
}

module.exports.createAccount = async (req) => {
    const { email } = req.body;

    const existing = await Account.findOne({ email, deleted: false });
    if (existing) {
        throw new Error("EMAIL_EXISTS");
    }

    if (req.file) {
        const uploadResult = await uploadToCloud(req.file.path);
        req.body.avatar = uploadResult.secure_url;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;

    delete req.body.confirmPassword;

    const record = new Account(req.body);
    return record.save();
};

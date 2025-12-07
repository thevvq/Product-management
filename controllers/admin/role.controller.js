const roleService = require('../../services/admin/role.service')
const sysConfig = require('../../config/system')

// [GET] /admin/roles
module.exports.index = async (req, res) => {
    try {
        const records = await roleService.getList()

        res.render('admin/pages/role/index', {
            pageTitle: 'Phân quyền',
            records
        })

    } catch (err) {
        console.log(err)
        req.flash('error', 'Có lỗi xảy ra, vui lòng thử lại!')
        res.redirect(`${sysConfig.prefixAdmin}/dashboard`)
    }
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
    try {

        res.render('admin/pages/role/create', {
            pageTitle: 'Tạo nhóm quyền',
        })

    } catch (err) {
        req.flash('error', 'Có lỗi xảy ra, vui lòng thử lại!')
        res.redirect(`${sysConfig.prefixAdmin}/dashboard`)
    }
}

// [POST] /admin/roles/create
module.exports.createRole = async (req, res) => {
    try {
        await roleService.createRole(req)

        req.flash('success', 'Tạo nhóm quyền thành công!')
        res.redirect(`${sysConfig.prefixAdmin}/roles`)
    } catch (err) {
        req.flash('error', 'Có lỗi xảy ra, vui lòng thử lại!')
        res.redirect(`${sysConfig.prefixAdmin}/dashboard`)
    }
}



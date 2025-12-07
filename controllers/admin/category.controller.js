const categoryService = require('../../services/admin/category.service')
const sysConfig = require('../../config/system')

// [GET] /admin/categories
module.exports.index = async (req, res) => {
    try {
        const records = await categoryService.getList(req.query)

        res.render('admin/pages/category/index', {
            pageTitle: 'Trang danh mục sản phẩm',
            ...records
        })

    } catch (err) {
        req.flash('error', 'Có lỗi xảy ra, vui lòng thử lại!')
        res.redirect(`${sysConfig.prefixAdmin}/dashboard`)
    }
}

// [GET] /admin/categories/create
module.exports.create = async (req, res) => {
    try {
        const records = await categoryService.create()

        res.render('admin/pages/category/create', {
            pageTitle: 'Tạo danh mục sản phẩm',
            records
        })

    } catch (err) {
        req.flash('error', 'Có lỗi xảy ra, vui lòng thử lại!')
        res.redirect(`${sysConfig.prefixAdmin}/categories`)
    }
}

// [POST] /admin/categories/create
module.exports.createCategory = async (req, res) => {
    try {
        await categoryService.createCategory(req)

        req.flash('success', 'Thêm doanh mục thành công!')
        res.redirect(`${sysConfig.prefixAdmin}/categories`)

    } catch (err) {
        req.flash('error', 'Có lỗi xảy ra, vui lòng thử lại!')
        res.redirect(`${sysConfig.prefixAdmin}/categories`)
    }
}

// [GET] /admin/categories/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const data = await categoryService.edit(req.params.id)

        res.render('admin/pages/category/edit', {
            pageTitle: 'Chỉnh sửa danh mục sản phẩm',
            ...data
        })

    } catch (err) {
        console.log(err)
        req.flash('error', 'Có lỗi xảy ra, vui lòng thử lại!')
        res.redirect(`${sysConfig.prefixAdmin}/categories`)
    }
}

// [PATCH] /admin/categories/edit/:id
module.exports.editCategory = async (req, res) => {
    try {
        await categoryService.editCategory(req)

        req.flash('success', 'Cập nhật doanh mục thành công!')
        res.redirect(`${sysConfig.prefixAdmin}/categories`)

    } catch (err) {
        req.flash('error', 'Có lỗi xảy ra, vui lòng thử lại!')
        res.redirect(`${sysConfig.prefixAdmin}/categories`)
    }
}
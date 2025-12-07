const express = require('express')
const router = express.Router()
const validate = require('../../validates/admin/category.validate')

const upload = require("../../config/multer")
const controller = require('../../controllers/admin/category.controller')

router.get('/', controller.index)

router.get('/create', controller.create)

router.post('/create', upload.single('thumbnail'), validate.createPost, controller.createCategory)

router.get('/edit/:id', controller.edit)

router.patch('/edit/:id', upload.single('thumbnail'), validate.createPost, controller.editCategory)

module.exports = router  
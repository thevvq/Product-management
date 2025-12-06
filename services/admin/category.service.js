const Category = require('../../models/category.model')
const uploadToCloud = require("../../helper/uploadCloud")
const createTreeHelper = require('../../helper/createTree')
const filterStatusHelper = require('../../helper/filterStatus')
const searchHelper = require('../../helper/search')
const paginationHelper = require('../../helper/pagination')

module.exports.getList = async (query) => {

    const filterStatus = filterStatusHelper(query)

    const find = { deleted: false }

    if (query.status) find.status = query.status

    const searchObject = searchHelper(query)
    if (searchObject.regex) find.title = searchObject.regex

    const allCategories = await Category.find(find).sort({ position: 1 })

    const fullTree = createTreeHelper.createTree(allCategories);

    const totalRoot = fullTree.length;

    const pagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 6
        },
        query,
        totalRoot
    );

    const paginatedRoot = fullTree.slice(
        pagination.skip,
        pagination.skip + pagination.limitItems
    );

    return {
        categories: allCategories,
        filterStatus,
        keyword: searchObject.keyword,
        pagination,
        tree: paginatedRoot  
    }
}


module.exports.create = async (req) => {
    const find = { deleted: false }
    
    const records = await Category.find(find)
    
    const tree = createTreeHelper.createTree(records)

    return tree
}

module.exports.createCategory = async (req) => {
    const body = req.body

    if (!body.position || body.position === "") {
        const count = await Category.countDocuments({ deleted: false })
        body.position = count + 1
    } else {
        body.position = parseInt(body.position)
    }

    if (req.file) {
        const uploadResult = await uploadToCloud(req.file.path)
        body.thumbnail = uploadResult.secure_url
    }

    const records = new Category(body)
    return records.save()
}
const Product = require('../../models/product.model')

const getList = async () => {
    const products = await Product.find({
        status: 'active',
        deleted: false
    })
    .sort({ position: 1 })

    const newProducts = products.map(item => {
        item.newPrice = (item.price * (100 - item.discountPercentage) / 100).toFixed(2)
        return item
    })

    return newProducts
}

module.exports.getList = getList

// ✅ Thêm hàm này dùng riêng cho trang home
module.exports.getProductsForHome = async (limit = 10) => {
    const products = await getList()
    return products.slice(0, limit)      // lấy 10 sp đầu (hoặc theo limit truyền vào)
}

module.exports.detail = async (slug) => {
    const product =  await Product.findOne({
        deleted: false,
        slug: slug,
        status: 'active'
    })
    
    product.newPrice = (product.price * (100 - product.discountPercentage) / 100).toFixed(2)
    
    return product
}

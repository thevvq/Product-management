const productService = require('../../services/client/product.service')

// [GET] /
module.exports.index = async (req, res, next) => {
  try {
    // Lấy tối đa 10 sản phẩm cho trang home
    const productsHome = await productService.getProductsForHome(10)

    res.render('client/pages/home/index', {
      pageTitle: 'Trang chủ',
      productsHome   // truyền sang Pug
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

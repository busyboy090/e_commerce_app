const db = require('../models/index.js');

const {
  Cart, 
  ProductVariant, 
  Product,
  Color,
  Size
} = db

const getCartByUserId = async(userId) => {
    return await Cart.findAll({
        where: { user_id },
        attributes: ['product_id','quantity'],
        include: [
          {
            model: Product,
            as: 'products',
            attributes: ['product_id', 'name', 'description'],
          },
          {
            model: ProductVariant,
            as: 'product_variants',
            attributes: ['price','sku','image'],
            include: [
              {
                model: Color,
                as:'colors',
                attributes:['name','hex_code']
              },
              {
                model: Size,
                as: 'sizes',
                attributes: ['label','region']
              }
            ]
          }
        ]
    });
}

module.exports = {
    getCartByUserId
}
const db = require('../models/index.js');
const sizeStandard = require('../models/size-standard.js');

const {
  Cart, 
  ProductVariant, 
  Product,
  Color,
  Size,
  ProductImage,
  SizeStandard
} = db

const getCartByUserId = async(user_id) => {
    return await Cart.findAll({
        where: { user_id },
        attributes: ['product_id','quantity'],
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['product_id', 'name', 'description'],
          },
          {
            model: ProductVariant,
            as: 'product_variant',
            attributes: ['price','sku'],
            include: [
              {
                model: Color,
                as:'color',
                attributes:['name','hex_code']
              },
              {
                model: Size,
                as: 'size',
                attributes: ['label'],
                include: {
                  model: SizeStandard,
                  as: 'sizeStandard',
                  attributes: ['name','description']
                }
              },
              {
                model: ProductImage,
                as: 'image',
                attributes: ['image','main_image',]
              }
            ]
          }
        ]
    });
}

module.exports = {
    getCartByUserId
}
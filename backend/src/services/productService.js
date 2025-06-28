const db = require('../models/index.js');
const { sequelize } = require('sequelize');

const {
  ProductVariant, 
  Product,
  Color,
  Size,
  Review
} = db

const getProductById = async(productId) => {
  return await Product.findAll({
    where: { product_id: productId },
    order: [['product_id', 'DESC']],
    attributes: [
      'product_id',
      'name',
      'description',
      'thumbnail',
      'price'
      [
        sequelize.literal(`
          CASE 
            WHEN AVG(reviews.rating) IS NULL THEN NULL
            ELSE ROUND((ROUND(AVG(reviews.rating) * 2, 0)) / 2, 1)
          END
        `),
        'averageRating'
      ],
      [sequelize.fn('COUNT', sequelize.col('reviews.review_id')), 'totalReviews']
    ],
    include: [
      {
        model: Review,
        attributes: [],
        required: false
      },
      {
        model: ProductVariant,
        attributes: ['variant_id','price', 'stock', 'sku','image'],
        required: false,
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
        ],
        separate: true
      }
    ],
    group: ['products.product_id'],
    subQuery: false
  });
}

module.exports = {
    getProductById
}
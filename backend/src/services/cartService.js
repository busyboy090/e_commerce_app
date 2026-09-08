const db = require('../models/index.js');
const AppError = require('../utils/appError.js')
const productService = require('./productService.js');
const userService = require('./userService.js')

const {
  Cart, 
  ProductVariant, 
  Product,
  Color,
  Size,
  ProductImage,
  SizeStandard,
  Country,
  User
} = db

const addProductToCart = async ({user_id, product_id, variant_id}) => {
  const product = await productService.getProductById(product_id);
  const cart = await Cart.create({
    user_id,
    variant_id,
    product_id
  })


  return;
} 

const getCartByUserId = async(user_id) => {
  const cart = await Cart.findAll({
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

  if (!cart) {
    throw new AppError('Cart not found for the user', 404);
  }

  return cart;
}

const getProducts = async ({ cart, user_id}) => {
  const user = await userService.getUserCountry(user_id);
  
  const variant_id = cart.map((cart) => cart.variant_id);
  
  const products = await ProductVariant.findAll({
    where: { variant_id },
    attributes: ['price','discount_price','discount_price','stock','stock','sku','variant_id','product_id'],
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['name','decription']
      },
      {
        model: Color,
        as: 'color',
        attributes: ['name','hex_code']
      },
      {
        model: ProductImage,
        as: 'image'
      }
    ]
  })

  const cartItems = [];

  for(const variant of products ) {
    for(const cartItem of cart) {
      if(variant.variant_id === cartItem.variant_id) {
        cartItems.push({
          product_id: variant.product_id,
          variant_id: variant.variant_id,
          quantity: cartItem.quantity,
          image: variant.image.image,
          name: variant.product.name,
          description: variant.product.description,
          price: variant.price,
          subtotal: variant.price * quantity,
        })
      }
    }
  }

  console.log(products);

  return;
}

module.exports = {
  getCartByUserId,
  getProducts,
  addProductToCart
}
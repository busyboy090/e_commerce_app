import Cart from '../models/cart.model.js';
import Product from '../models/product/product.model.js';
import ProductVariant from '../models/product/product-variant.model.js';
import ProductColor from '../models/product/product-color.model.js';


export const createCart = async (req, res) => {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length < 1) return res.status(400).json({ msg: 'Missing required field'});

    const user_id = req.user.id;

    try {

        cartItems.forEach(async (item) => {
            const isCartItemExisting = await Cart.findOne({where: {user_id,product_id: item.productId}});
    
            if(isCartItemExisting) {
                isCartItemExisting.quantity = item.quantity;
            }else {
                Cart.create({
                    user_id,
                    product_id: item.productId,
                    quantity: item.quantity
                })
            }
        })

        res.status(201).json({ msg: 'Cart created successfully'});

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error'})
    }

}

export const getCart = async (req, res) => {
    const user_id = req.user.id;

    try {
        const cartItems = await Cart.findAll({
            attributes: ['product_id', 'quantity'],
        });

        const products = await Cart.findAll({
            where: { user_id },
            include: [
              {
                model: Product,
                as: 'products', // <-- use the correct alias from your Cart association
                attributes: ['product_id', 'name', 'description'],
                include: [
                  {
                    model: ProductVariant,
                    as: 'product_variants',
                    attributes: ['variant_id', 'price']
                  },
                  {
                    model: ProductColor,
                    as: 'product_colors',
                    attributes: ['color_id', 'image']
                  }
                ]
              }
            ]
          });
          

        res.status(200).json({
            products,
            cartItems
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error'})
    }
}
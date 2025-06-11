import Cart from '../models/cart.model.js';
import Product from '../models/product/product.model.js';
import ProductVariant from '../models/product/product-variant.model.js';
import ProductColor from '../models/product/product-color.model.js';


export const addProductToCart = async (req, res) => {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length < 1) return res.status(400).json({ msg: 'Missing required field'});

    const user_id = req.user.id;

    try {

        for (const item of cartItems) {
            if (item.productId && item.quantity) {
                const isCartItemExisting = await Cart.findOne({ where: { user_id, product_id: item.productId } });
          
                if (isCartItemExisting) {
                  const newQty = isCartItemExisting.quantity + item.quantity;
                  await isCartItemExisting.update({quantity: newQty});
                } else {
                    await Cart.create({
                    user_id,
                    product_id: item.productId,
                    quantity: item.quantity
                    });
                }
            }
          }          

        const cart = await Cart.findAll({
            attributes: ['product_id', 'quantity'],
        });

        const products = await Cart.findAll({
            where: { user_id },
            include: [
              {
                model: Product,
                as: 'products',
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
        
        res.status(201).json({ 
            msg: 'Cart created successfully',
            products,
            cartItems: cart
        });

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
                as: 'products',
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

export const updateCart = async (req, res) => {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length < 1) return res.status(400).json({ msg: 'Missing required field'});

    const user_id = req.user.id;

    try {
        for (const item of cartItems) {
            const isCartItemExisting = await Cart.findOne({ where: { user_id, product_id: item.productId } });
          
            if (isCartItemExisting) {
              isCartItemExisting.quantity = item.quantity;
              await isCartItemExisting.save();
            } else {
              await Cart.create({
                user_id,
                product_id: item.productId,
                quantity: item.quantity
              });
            }
          }          

        const cart = await Cart.findAll({
            attributes: ['product_id', 'quantity'],
        });

        const products = await Cart.findAll({
            where: { user_id },
            include: [
              {
                model: Product,
                as: 'products',
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
            msg: 'Cart updated successfully',
            products,
            cartItems: cart
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error'})
    }
}

export const deleteCartProductFromCart = async (req, res) => {
    const user_id = req.user.id;
    const productId = req.params.productId;

    if (!productId) return res.status(400).json({ msg: 'Missing required field'});

    try {
        const isCartItemExisting = await Cart.findOne({ where: { user_id, product_id: productId } });

        if (!isCartItemExisting) return res.status(404).json({ msg: 'Cart item not found' });

        await isCartItemExisting.destroy();

        const cart = await Cart.findAll({
            attributes: ['product_id', 'quantity'],
        });

        const products = await Cart.findAll({
            where: { user_id },
            include: [
              {
                model: Product,
                as: 'products',
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
            msg: 'Cart item deleted successfully',
            products,
            cartItems: cart 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error'})
    }
}

export const updateCartProductQuantity = async (req, res) => {
  const productId  = req.params.productId;
  const user_id = req.user.id;
  const quantity = req.body.quantity

    if (!productId || !quantity ) return res.status(400).json({ msg: 'Missing required field'});

    try {
        const isCartItemExisting = await Cart.findOne({ where: { user_id, product_id: productId } });

        if (!isCartItemExisting) return res.status(404).json({ msg: 'Cart item not found' });

        await isCartItemExisting.update({quantity});

        const cart = await Cart.findAll({
            attributes: ['product_id', 'quantity'],
        });

        const products = await Cart.findAll({
            where: { user_id },
            include: [
              {
                model: Product,
                as: 'products',
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
            msg: 'Cart item updated successfully',
            products,
            cartItems: cart 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error'})
    }
}

const db = require("../models/index.js");
const { getCartByUserId } = require("../services/cartService.js");

const { Cart } = db;

const addProductToCart = async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || cartItems.length < 1)
    return res.status(400).json({ msg: "Missing required field" });

  const user_id = req.user.id;

  try {
    for (const item of cartItems) {
      if (item.productId && item.quantity) {
        const isCartItemExisting = await Cart.findOne({
          where: { user_id, product_id: item.productId },
        });

        if (isCartItemExisting) {
          const newQty = isCartItemExisting.quantity + item.quantity;
          await isCartItemExisting.update({ quantity: newQty });
        } else {
          await Cart.create({
            user_id,
            product_id: item.productId,
            quantity: item.quantity,
          });
        }
      }
    }

    const cart = await getCartByUserId(user_id);

    res.status(201).json({
      msg: "Cart created successfully",
      cart
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getCart = async (req, res) => {
  const user_id = req.user.id;
  
  if(!user_id) {
    return res.status(400).json({ msg: ''})
  }

  try {

    const cart = await getCartByUserId(user_id);

    if(!cart) {
      return res.status(404).json({ message: 'Cart not found'})
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const updateCart = async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || cartItems.length < 1)
    return res.status(400).json({ msg: "Missing required field" });

  const user_id = req.user.id;

  try {
    for (const item of cartItems) {
      const isCartItemExisting = await Cart.findOne({
        where: { user_id, product_id: item.productId },
      });

      if (isCartItemExisting) {
        isCartItemExisting.quantity = item.quantity;
        await isCartItemExisting.save();
      } else {
        await Cart.create({
          user_id,
          product_id: item.productId,
          quantity: item.quantity,
        });
      }
    }

    const cart = await getCartByUserId(user_id);

    if(!cart) {
      return res.status(404).json({ message: 'Cart not found'})
    }

    res.status(200).json({
      msg: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteCartProductFromCart = async (req, res) => {
  const user_id = req.user.id;
  const productId = req.params.productId;

  if (!productId)
    return res.status(400).json({ msg: "Missing required field" });

  try {
    const isCartItemExisting = await Cart.findOne({
      where: { user_id, product_id: productId },
    });

    if (!isCartItemExisting)
      return res.status(404).json({ msg: "Cart item not found" });

    await isCartItemExisting.destroy();

    const cart = await getCartByUserId(user_id)    

    if(!cart) {
      return res.status(404).json({ message: 'Cart not found'})
    }

    res.status(200).json({
      msg: "Cart item deleted successfully",
      cart
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const updateCartProductQuantity = async (req, res) => {
  const productId = req.params.productId;
  const user_id = req.user.id;
  const quantity = req.body.quantity;

  if (!productId || !quantity)
    return res.status(400).json({ msg: "Missing required field" });

  try {
    const isCartItemExisting = await Cart.findOne({
      where: { user_id, product_id: productId },
    });

    if (!isCartItemExisting)
      return res.status(404).json({ msg: "Cart item not found" });

    await isCartItemExisting.update({ quantity });

    const cart = await getCartByUserId(user_id);
   
    if(!cart) {
      return res.status(404).json({ message: 'Cart not found'})
    }

    res.status(200).json({
      msg: "Cart item updated successfully",
      cart
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  addProductToCart,
  getCart,
  updateCart,
  deleteCartProductFromCart,
  updateCartProductQuantity,
};

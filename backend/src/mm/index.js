import User from "./user.model.js";
import Otp from './otp.model.js';
import Product from './product/product.model.js'
import Cart from "./cart.model.js";

User.hasOne(Otp, { foreignKey: 'userId' });
Otp.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

Product.hasMany(Cart, {foreignKey: 'product_id', as: 'carts'})
Cart.belongsTo(Product, {foreignKey: 'product_id', as: 'products'})
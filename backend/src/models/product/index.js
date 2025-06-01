import Color from "./color.model.js";
import Product from "./product.model.js";
import FlashSale from "./flashsale.model.js";
import ProductColor from "./product-color.model.js";
import BestSellingProduct from "./best-selling-product.model.js";
import Category from "./category.model.js";
import Brand from './brand.model.js'
import Type from './type.model.js';
import Size from './size.model.js';
import ProductSize from './product-size.model.js';
import Review from './review.model.js';
import ProductVariant from './product-variant.model.js';
import User from '../user.model.js';
import CategoryType from "./category-type.js";
import BrandCategory from "./brand-category.model.js";


Color.hasMany(ProductColor, { foreignKey: 'color_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProductColor.belongsTo(Color, { foreignKey: 'color_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.hasMany(ProductColor, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProductColor.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.hasMany(FlashSale, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
FlashSale.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.hasOne(BestSellingProduct, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
BestSellingProduct.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Product.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Category.hasMany(BrandCategory, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
BrandCategory.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Category.hasMany(Type, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
CategoryType.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Brand.hasMany(Product, { foreignKey: 'brand_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Product.belongsTo(Brand, { foreignKey: 'brand_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Type.hasMany(Product, { foreignKey: 'type_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Product.belongsTo(Type, { foreignKey: 'type_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.hasMany(ProductSize, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProductSize.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Size.hasMany(ProductSize, { foreignKey: 'size_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProductSize.belongsTo(Size, { foreignKey: 'size_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Size.hasMany(Type, { foreignKey: 'type_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Type.belongsTo(Size, { foreignKey: 'type_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.hasMany(Review, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Review.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasMany(Review, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.hasMany(ProductVariant, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProductVariant.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Color.hasMany(ProductVariant, { foreignKey: 'color_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProductVariant.belongsTo(Color, { foreignKey: 'color_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Size.hasMany(ProductVariant, { foreignKey: 'size_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProductVariant.belongsTo(Size, { foreignKey: 'size_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
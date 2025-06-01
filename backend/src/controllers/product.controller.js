import Product from "../models/product/product.model.js";
import Color from "../models/product/color.model.js";
import ProductColor from "../models/product/product-color.model.js";
import "../models/product/index.js";
import { fn, Op, col } from "sequelize";
import Category from "../models/product/category.model.js";
import Brand from '../models/product/brand.model.js';
import Type from "../models/product/type.model.js";
import ProductVariant from "../models/product/product-variant.model.js";
import Review from "../models/product/review.model.js";
import sequelize from "../config/db.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      rating,
      reviews,
      colors,
    } = req.body;

    // Check if any field is missing
    if (!name || !description || !price || !stock || !category || colors.length < 1) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the category exists
    let categoryExists = await Category.findOne({ where: { name: category } });
    if (!categoryExists) {
      // Create the category if it doesn't exist
      categoryExists = await Category.create({ name: category });
    }
    

    // Check if the product already exists
    let product = await Product.findOne({ where: { name } });

    if (!product) {
      // Create the product first
      product = await Product.create({
        name,
        description,
        price,
        stock,
        category_id: categoryExists.category_id,
        rating,
        reviews,
      });
    }

    for (const productColor of colors) {
      // Check if the color already exists
      let color = await Color.findOne({ where: { name: productColor.name } });

      // If color does not exist, create it
      if (!color) {
        color = await Color.create({
          name: productColor.name,
          hex_code: productColor.hex_code,
        });
      }

      // Check if the relationship already exists
      let existingProductColor = await ProductColor.findOne({
        where: {
          product_id: product.product_id,
          color_id: color.id,
        },
      });

      // If relationship does not exist, create it
      if (!existingProductColor) {
        await ProductColor.create({
          product_id: product.product_id,
          color_id: color.id,
          image: productColor.image,
        });
      }
    }

    res.status(201).json({ msg: "Product created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error creating product" });
  }
};


export const getRandomProducts = async (req, res) => {
  const { limit = 8 } = req.query;
  try {
    const offset = Math.floor(Math.random() * (await Product.count() - limit ));

    // First get paginated product IDs
    const productIdsResult = await Product.findAll({
      attributes: ['product_id'],
      limit,
      offset,
      order: [['product_id', 'DESC']],
      raw: true
    });

    if (productIdsResult.length === 0) {
      return res.status(200).json({
        totalProducts: 0,
        products: []
      });
    }

    const productIds = productIdsResult.map(p => p.product_id);

    // Then get full product data with all relationships
    const products = await Product.findAll({
      where: { product_id: productIds },
      order: [['product_id', 'DESC']],
      attributes: [
        'product_id',
        'name',
        'description',
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
          model: ProductColor,
          include: [{
            model: Color,
            attributes: ['color_id', 'name', 'hex_code']
          }],
          attributes: ['id', 'image'],
          required: false,
          separate: true
        },
      ],
      group: ['products.product_id'],
      subQuery: false
    });

    // Get total count of products
    const totalProducts = await Product.count();

    res.status(200).json({
      totalProducts: products.length,
      products
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error paginating products",
      error: error.message
    });
  }

}

export const getMultipleProducts = async (req, res) => {
  const { productIds } = req.body;

  if (productIds.length < 1 || !productIds) return res.status(400).json({ msg: "field can't be empty"});

  try {
  
    // Then get full product data with all relationships
    const products = await Product.findAll({
      where: { product_id: productIds },
      order: [['product_id', 'DESC']],
      attributes: [
        'product_id',
        'name',
        'description',
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
          model: ProductColor,
          include: [{
            model: Color,
            attributes: ['color_id', 'name', 'hex_code']
          }],
          attributes: ['id', 'image'],
          required: false,
          separate: true
        },
        {
          model: ProductVariant,
          attributes: ['variant_id', 'color_id', 'size_id', 'price', 'stock', 'sku'],
          required: false,
          separate: true
        }
      ],
      group: ['products.product_id'],
      subQuery: false
    });

    res.status(200).json({
      products
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error paginating products",
      error: error.message
    });
  }

}

export const getProductById = async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(400).json({ msg: 'Product id is required' });

  try {
    const product = await Product.findOne({
      where: { product_id: id },
      attributes: [
        "product_id",
        "name",
        "description",
        "price",
        "stock",
        "rating",
        "reviews",
      ],
      include: [
        {
          model: ProductColor,
          attributes: ["image"],
          required: false,
          include: [
            {
              model: Color,
              attributes: ["name", "hex_code"],
            },
          ],
        },
        {
          model: Category,
          attributes: ["name"]
        }
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error retrieving product",
      error: error.message, // Send back the error message for better insight
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.query;
  const { name, description, price, stock, rating, reviews } =
    req.body;

    if (!id) return res.status(400).json({ msg: 'Product id is required' });

    if (!name || !description || !price || !stock) {
        return res.status(400).json({ message: "Missing required fields" });
    }

  try {
    const product = await Product.findOne({ where: { product_id: id } });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.update(
      { name, description, price, stock, rating, reviews },
      { where: { product_id: product.product_id } }
    );

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error updating product",
      error: error.message, // Send back the error message for better insight
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.query;

  if(!id) return res.status(400).json({ message: "Product ID is required" });

  try {
    const product = await Product.findOne({ where: { product_id: id } });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.destroy({ where: { product_id: id } });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error deleting product",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// search product by their names
export const searchProducts = async (req, res) => {
  const { query } = req.query;

  if (!query) return res.status(400).json({ msg: 'Search params is required'});

  try {
    const products = await Product.findAll({
      where: { name : { [Op.like]: `%${query}%` } },
      attributes: [
        "product_id",
        "name",
        "price",
        "description",
        "stock",
        "rating",
        "reviews",
      ],
      include: [
        {
          model: ProductColor,
          attributes: ["image"],
          required: false,
          include: [
            {
              model: Color,
              attributes: ["name", "hex_code"],
            },
          ],
        },
        {
          model: Category,
          attributes: ["name"],
        }
      ],
    });

    if (!products || products.length < 1) return res.status(404).json({ msg: 'No products found' });

    res.status(200).json(products);

  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error searching products",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// filter products by category, min-price, max-price
export const filterProducts = async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

  if(!category && !minPrice && !maxPrice) {
    return res.status(400).json({ message: "At least one filter field is required" });
  }

  try {
    const whereClause = {};

    if (minPrice) {
      whereClause.price = { [Op.gte]: minPrice };
    }

    if (maxPrice) {
      whereClause.price = { ...whereClause.price, [Op.lte]: maxPrice };
    }

    const products = await Product.findAll({
      where: whereClause,
      attributes:[
        "product_id",
        "name",
        "price",
        "description",
        "stock",
        "rating",
        "reviews",
      ],
      include: [
        {
          model: ProductColor,
          attributes: ["image"],
          required: false,
          include: [
            {
              model: Color,
              attributes: ["name", "hex_code"],
            },
          ],
        },
        {
          model: Category,
          attributes: ["name"],
          where: { name: { [Op.like]: `%${category}%` } }
        }
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error filtering products",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// sort product
export const sortProducts = async (req, res) => {
  const { sortBy } = req.query; // sortBy can be 'price' or 'rating'

  if(!sortBy) return res.status(400).json({ message: "Sort parameter is required" });

  try {
    const order =
      sortBy === "price" ? [["price", "ASC"]] : [["rating", "DESC"]];

    const products = await Product.findAll({
      order: order,
      attributes: [
        "product_id",
        "name",
        "price",
        "description",
        "stock",
        "rating",
        "reviews",
      ],
      include: [
        {
          model: ProductColor,
          attributes: ["image"],
          required: false,
          include: [
            {
              model: Color,
              attributes: ["name", "hex_code"],
            },
          ],
        },
        {
          model: Category,
          attributes: ["name"]
        }
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error sorting products",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// paginate products
export const paginateProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const offset = (parsedPage - 1) * parsedLimit;

    // First get paginated product IDs
    const productIdsResult = await Product.findAll({
      attributes: ['product_id'],
      limit: parsedLimit,
      offset: offset,
      order: [['product_id', 'DESC']],
      raw: true
    });

    if (productIdsResult.length === 0) {
      return res.status(200).json({
        totalProducts: 0,
        totalPages: 0,
        currentPage: parsedPage,
        products: []
      });
    }

    const productIds = productIdsResult.map(p => p.product_id);

    // Then get full product data with all relationships
    const products = await Product.findAll({
      where: { product_id: productIds },
      order: [['product_id', 'DESC']],
      attributes: [
        'product_id',
        'name',
        'description',
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
          model: ProductColor,
          include: [{
            model: Color,
            attributes: ['color_id', 'name', 'hex_code']
          }],
          attributes: ['id', 'image'],
          required: false,
          separate: true
        },
        {
          model: Category,
          attributes: ['category_id', 'name'],
          required: false
        },
        {
          model: Brand,
          attributes: ['brand_id', 'name'],
          required: false
        },
        {
          model: Type,
          attributes: ['type_id', 'type'],
          required: false
        },
        {
          model: ProductVariant,
          attributes: ['variant_id', 'color_id', 'size_id', 'price', 'stock', 'sku'],
          required: false,
          separate: true
        }
      ],
      group: ['products.product_id'],
      subQuery: false
    });

    // Get total count of products
    const totalProducts = await Product.count();

    res.status(200).json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / parsedLimit),
      currentPage: parsedPage,
      products
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error paginating products",
      error: error.message
    });
  }
};

// get product colors by product id
export const getProductColors = async (req, res) => {
  const { id } = req.params;

  if(!id) return res.status(400).json({ message: "Product ID is required" });

  try {
    const productColors = await ProductColor.findAll({
      where: { product_id: id },
      include: [
        {
          model: Color,
          attributes: ["name", "hex_code"],
        },
      ],
    });

    if (!productColors) {
      return res.status(404).json({ message: "Product colors not found" });
    }

    res.status(200).json(productColors);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error retrieving product colors",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// update product color by id
export const updateProductColor = async (req, res) => {
  const { id } = req.params;
  const { color_id, image } = req.body;

  if (!id) return res.status(400).json({ msg: 'Product Id is required' });

  if(!color_id || !image) return res.status(400).json({ message: "Missing required fields" });

  try {
    const productColor = await ProductColor.findOne({ where: { id } });

    if (!productColor) {
      return res.status(404).json({ message: "Product color not found" });
    }

    await ProductColor.update({ color_id, image }, { where: { id } });

    res.status(200).json({ message: "Product color updated successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error updating product color",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// delete product color by id
export const deleteProductColor = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Product ID is required" });

  try {
    const productColor = await ProductColor.findOne({ where: { id } });

    if (!productColor) {
      return res.status(404).json({ message: "Product color not found" });
    }

    await ProductColor.destroy({ where: { id } });

    res.status(200).json({ message: "Product color deleted successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error deleting product color",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// create a product color by product id and color id
export const createProductColor = async (req, res) => {
  const { product_id, color_id, image } = req.body;

    if (!product_id || !color_id || !image) {
        return res.status(400).json({ message: "Missing required fields" });
    }

  try {
    const productColor = await ProductColor.create({
      product_id,
      color_id,
      image,
    });

    res
      .status(201)
      .json({ message: "Product color created successfully", productColor });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error creating product color",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// get product by category
export const getProductByCategory = async (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ message: "Category is required" });
  }

  try {
    const products = await Product.findAll({
      attributes: [
        "product_id",
        "name",
        "price",
        "description",
        "stock",
        "rating",
        "reviews",
      ],
      include: [
        {
          model: ProductColor,
          attributes: ["image"],
          required: false,
          include: [
            {
              model: Color,
              attributes: ["name", "hex_code"],
            },
          ],
        },
        {
          model: Category,
          attributes: ["name"],
          where: { name: { [Op.like]: `%${category}%` } }
        }
      ],
    });

    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error retrieving products by category",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// get product by product name
export const getProductByName = async (req, res) => {
  const { name } = req.query;

  try {
    const product = await Product.findOne({
      where: { name },
      attributes: [
        "product_id",
        "name",
        "price",
        "description",
        "stock",
        "category",
        "rating",
        "reviews",
      ],
      include: [
        {
          model: ProductColor,
          attributes: ["image"],
          required: false,
          include: [
            {
              model: Color,
              attributes: ["name", "hex_code"],
            },
          ],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error retrieving product by name",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// get product by product price range
export const getProductByPriceRange = async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  try {
    const products = await Product.findAll({
      where: {
        price: {
          [Op.gte]: minPrice,
          [Op.lte]: maxPrice,
        },
      },
      attributes: [
        "product_id",
        "name",
        "price",
        "description",
        "stock",
        "category",
        "rating",
        "reviews",
      ],
      include: [
        {
          model: ProductColor,
          attributes: ["image"],
          required: false,
          include: [
            {
              model: Color,
              attributes: ["name", "hex_code"],
            },
          ],
        },
      ],
    });

    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No products found in this price range" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error retrieving products by price range",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// get product by product stock
export const getProductByStock = async (req, res) => {
  const { stock } = req.query;

  try {
    const products = await Product.findAll({
      where: { stock },
      attributes: [
        "product_id",
        "name",
        "price",
        "description",
        "stock",
        "category",
        "rating",
        "reviews",
      ],
      include: [
        {
          model: ProductColor,
          attributes: ["image"],
          required: false,
          include: [
            {
              model: Color,
              attributes: ["name", "hex_code"],
            },
          ],
        },
      ],
    });

    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No products found with this stock" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error retrieving products by stock",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// get product by ratings
export const getProductByRating = async (req, res) => {
  const { rating } = req.query;

  try {
    const products = await Product.findAll({
      where: { rating },
      attributes: [
        "product_id",
        "name",
        "price",
        "description",
        "stock",
        "category",
        "rating",
        "reviews",
      ],
      include: [
        {
          model: ProductColor,
          attributes: ["image"],
          required: false,
          include: [
            {
              model: Color,
              attributes: ["name", "hex_code"],
            },
          ],
        },
      ],
    });

    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No products found with this rating" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error retrieving products by rating",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// get product by reviews
export const getProductByReviews = async (req, res) => {
  const { reviews } = req.query;

  try {
    const products = await Product.findAll({
      where: { reviews },
      attributes: [
        "product_id",
        "name",
        "price",
        "description",
        "stock",
        "category",
        "rating",
        "reviews",
      ],
      include: [
        {
          model: ProductColor,
          attributes: ["image"],
          required: false,
          include: [
            {
              model: Color,
              attributes: ["name", "hex_code"],
            },
          ],
        },
      ],
    });

    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No products found with this reviews" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error retrieving products by reviews",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// get product by category and price
export const getProductByCategoryAndPrice = async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

  try {
    const products = await Product.findAll({
      where: {
        category,
        price: {
          [Op.gte]: minPrice,
          [Op.lte]: maxPrice,
        },
      },
      attributes: [
        "product_id",
        "name",
        "price",
        "description",
        "stock",
        "category",
        "rating",
        "reviews",
      ],
      include: [
        {
          model: ProductColor,
          attributes: ["image"],
          required: false,
          include: [
            {
              model: Color,
              attributes: ["name", "hex_code"],
            },
          ],
        },
      ],
    });

    if (!products.length) {
      return res
        .status(404)
        .json({
          message: "No products found with this category and price range",
        });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error retrieving products by category and price",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// get product by category and stock
export const getProductByCategoryAndStock = async (req, res) => {
  const { category, stock } = req.query;

  try {
    const products = await Product.findAll({
      where: {
        category,
        stock,
      },
      attributes: [
        "product_id",
        "name",
        "price",
        "description",
        "stock",
        "category",
        "rating",
        "reviews",
      ],
      include: [
        {
          model: ProductColor,
          attributes: ["image"],
          required: false,
          include: [
            {
              model: Color,
              attributes: ["name", "hex_code"],
            },
          ],
        },
      ],
    });

    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No products found with this category and stock" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error retrieving products by category and stock",
      error: error.message, // Send back the error message for better insight
    });
  }
};

// create categories
export const createCategories = async (req, res) => {
  const { names } = req.body;

  if (!names) return res.status(400).json({ msg: 'Category name '})
  
  try {

    for(const name of names ) {
      // check if the category exist already
      let category = await Category.findOne({ name });

      if (!category) {
        category = await Category.create({ name });

        res.status(201).json({ msg: "Category created successfully"})
      }

    }

  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error creating category",
      error: error.message, // Send back the error message for better insight
    });
  }
}

// get all categories
export const getAllCategories = async (req, res) => {

  try {

    const categories = await Category.findAll({ attributes: ['name'] });

    res.status(200).json({
      categories
    })

  }catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Error retrieving categories",
      error: error.message, // Send back the error message for better insight
    });
  }


}
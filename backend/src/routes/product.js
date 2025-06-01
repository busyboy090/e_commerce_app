import express from "express";
import {
  createProduct,
  getRandomProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  filterProducts,
  sortProducts,
  paginateProducts,
  getProductColors,
  deleteProductColor,
  updateProductColor,
  createProductColor,
  getProductByCategory,
  createCategories,
  getAllCategories,
  getMultipleProducts
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route to create a new product
router.post("/", createProduct);

// Route to get random products
router.get("/", getRandomProducts);

// Route to get product by Id
router.get("/", getProductById);

// Route to get multiple products
router.post("/multipleproducts", getMultipleProducts);

// Route to update product
router.put("/", updateProduct);

// Route to delete product
router.delete("/", deleteProduct);

// Route to search products
router.get("/search", searchProducts);

// Route to filter products by category, min-price, max-price
router.get("/filter", filterProducts);

// Route to filter products by category, min-price, max-price
router.get("/sort", sortProducts);

// Route to paginate products
router.get("/paginate-products", paginateProducts);

// Route to get product color by id
router.get("/color", getProductColors);

// Route to update product color by id
router.put("/color", updateProductColor);

// Route to delete product color by id
router.delete("/color", deleteProductColor);

// Route to create product color by id
router.post("/color", createProductColor);

// Route to get product by category
router.get("/product-category", getProductByCategory);

// Route to create a new categories 
router.post("/category", createCategories);

// Route to get all categories
router.get("/categories", getAllCategories);


export default router;

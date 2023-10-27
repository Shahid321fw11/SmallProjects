const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/Product");
const {
  createReview,
  deleteReview,
  getReviewsForProduct,
} = require("../controllers/Reviews");
const router = express.Router();

// Create a new product
router.post("/", createProduct);

// Read all products
router.get("/", getAllProducts);

// Read product by ID
router.get("/:id", getProductById);

// Update a product by ID
router.put("/:id", updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

// Create a review for a product
router.post("/:productId/reviews", createReview);

// Delete a review for a product
router.delete("/:productId/reviews/:reviewId", deleteReview);

// Get all reviews for a product
router.get("/:productId/reviews", getReviewsForProduct);

module.exports = router;

const express = require("express");
const {
  createReview,
  deleteReview,
  getReviewsForProduct,
} = require("../controllers/Reviews");
const router = express.Router();

// Create a review for a product
router.post("/products/:productId/reviews", createReview);

// Delete a review for a product
router.delete("/products/:productId/reviews/:reviewId", deleteReview);

// Get all reviews for a product
router.get("/products/:productId/reviews", getReviewsForProduct);

module.exports = router;

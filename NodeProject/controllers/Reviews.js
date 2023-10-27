const Review = require("../models/Reviews");
const Product = require("../models/Product");

// Create a new review for a product
const createReview = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { userId, description } = req.body;

    const product = await Product.findById(productId).exec();

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    const review = new Review({ userId, description });
    const savedReview = await review.save();
    product.reviews.push(savedReview);
    await product.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: "Failed to create the review." });
  }
};

// Delete a review for a product
const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await Product.findById(productId).exec();

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    const review = await Review.findById(reviewId).exec();

    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }

    product.reviews.pull(reviewId);
    await product.save();
    await Review.findByIdAndRemove(reviewId).exec();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the review." });
  }
};

// Get all reviews for a product
const getReviewsForProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId)
      .populate("reviews")
      .exec();

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product.reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews." });
  }
};

module.exports = { createReview, deleteReview, getReviewsForProduct };

const Product = require("../models/Product");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = new Product({ name, price });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: "Failed to create the product." });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("reviews").exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).exec();
    if (!product) {
      res.status(404).json({ error: "Product not found." });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the product." });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, uDate: new Date() },
      { new: true }
    ).exec();
    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found." });
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the product." });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndRemove(productId).exec();
    if (!deletedProduct) {
      res.status(404).json({ error: "Product not found." });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the product." });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

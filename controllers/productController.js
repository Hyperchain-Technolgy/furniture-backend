const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
  const { name, description, price, image, category } = req.body;

  // Create product
  const product = new Product({ name, description, price, image, category });

  // Save product
  await product.save();

  // Send response
  res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
  // Get all products
  const products = await Product.find();

  // Send response
  res.status(200).json(products);
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  // Find product by id
  const product = await Product.findById(id);

  // Check if product exists
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Send response
  res.status(200).json(product);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category } = req.body;

  // Find product by id
  const product = await Product.findById(id);

  // Check if product exists
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Update product
  product.name = name;
  product.description = description;
  product.price = price;
  product.image = image;
  product.category = category;

  // Save product
  await product.save();

  // Send response
  res.status(200).json(product);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Find product by id
  const product = await Product.findById(id);

  // Check if product exists
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Delete product
  await product.delete();

  // Send response
  res.status(200).json({ message: 'Product deleted' });
};


// Product controller
exports.createProduct = async (req, res) => {
    // ...
  
    // Verify JWT
    const verified = req.user;
  
    // Check if user is admin
    if (verified.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    // ...
  };
const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Create order
  const order = new Order({ userId, productId, quantity });

  // Save order
  await order.save();

  // Send response
  res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
  // Get all orders
  const orders = await Order.find();

  // Send response
  res.status(200).json(orders);
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  // Find order by id
  const order = await Order.findById(id);

  // Check if order exists
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Send response
  res.status(200).json(order);
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Find order by id
  const order = await Order.findById(id);

  // Check if order exists
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Update order
  order.status = status;

  // Save order
  await order.save();

  // Send response
  res.status(200).json(order);
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  // Find order by id
  const order = await Order.findById(id);

  // Check if order exists
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Delete order
  await order.delete();

  // Send response
  res.status(200).json({ message: 'Order deleted' });
};

// Order controller
exports.createOrder = async (req, res) => {
    // ...
  
    // Verify JWT
    const verified = req.user;
  
    // ...
  };
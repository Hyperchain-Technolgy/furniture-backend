const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

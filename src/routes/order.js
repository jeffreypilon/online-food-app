const express = require('express');
const router = express.Router();
const { validateOrderInput } = require('../middleware/validation');

// Get all orders
router.get('/', (req, res) => {
  // Mock data - in a real app, this would come from a database
  const orders = [
    { id: 1, items: [{ id: 1, name: 'Margherita Pizza', quantity: 2 }], total: 21.98, status: 'delivered', createdAt: '2023-05-15' },
    { id: 2, items: [{ id: 3, name: 'Vegetarian Burger', quantity: 1 }, { id: 5, name: 'French Fries', quantity: 1 }], total: 14.98, status: 'processing', createdAt: '2023-05-16' }
  ];
  
  res.json({ success: true, data: orders });
});

// Create new order
router.post('/', validateOrderInput, (req, res) => {
  const { items, address, paymentMethod } = req.body;
  
  // Mock order creation - in a real app, this would save to a database
  const newOrder = {
    id: Date.now(),
    items,
    total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    status: 'received',
    createdAt: new Date().toISOString().split('T')[0],
    address,
    paymentMethod
  };
  
  res.status(201).json({ 
    success: true, 
    message: 'Order created successfully', 
    data: newOrder 
  });
});

// Get order by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // Mock data lookup - in a real app, this would query a database
  const orders = [
    { id: 1, items: [{ id: 1, name: 'Margherita Pizza', quantity: 2 }], total: 21.98, status: 'delivered', createdAt: '2023-05-15' },
    { id: 2, items: [{ id: 3, name: 'Vegetarian Burger', quantity: 1 }, { id: 5, name: 'French Fries', quantity: 1 }], total: 14.98, status: 'processing', createdAt: '2023-05-16' }
  ];
  
  const order = orders.find(order => order.id === id);
  
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  
  res.json({ success: true, data: order });
});

module.exports = router;

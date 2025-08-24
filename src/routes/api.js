const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Get all menu items
router.get('/menu-items', (req, res) => {
  // Use the model to get menu items
  const menuItems = MenuItem.getAllItems();
  res.json({ success: true, data: menuItems });
});

// Get menu item by ID
router.get('/menu-items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const menuItem = MenuItem.getItemById(id);
  
  if (!menuItem) {
    return res.status(404).json({ success: false, message: 'Menu item not found' });
  }
  
  res.json({ success: true, data: menuItem });
});

// Get menu items by category
router.get('/menu-items/category/:category', (req, res) => {
  const category = req.params.category;
  const menuItems = MenuItem.getItemsByCategory(category);
  
  res.json({ success: true, data: menuItems });
});

// Create a new order
router.post('/orders', (req, res) => {
  const { items, customerInfo } = req.body;
  
  // Validate request
  if (!items || !items.length || !customerInfo) {
    return res.status(400).json({ success: false, message: 'Invalid order data' });
  }
  
  // In a real app, this would save to a database
  const order = {
    id: Date.now(),
    items,
    customerInfo,
    total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({ success: true, data: order });
});

// Get cart items
router.get('/cart', (req, res) => {
  // In a real app, this would be stored in a session or database
  const cartItems = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 1, image: 'pizza.jpg' },
    { id: 3, name: 'Spaghetti Carbonara', price: 11.99, quantity: 2, image: 'pasta.jpg' }
  ];
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  res.json({ success: true, data: { items: cartItems, total } });
});

module.exports = router;

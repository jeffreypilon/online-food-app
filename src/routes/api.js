const express = require('express');
const router = express.Router();

// Get all menu items
router.get('/menu-items', (req, res) => {
  // In a real app, this would fetch from a database
  const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Pizza', image: 'margherita_pizza.avif', description: 'Classic cheese and tomato pizza with fresh basil.' },
    { id: 2, name: 'Classic Burger', price: 9.99, category: 'Burger', image: 'burger.jpg', description: 'Juicy beef patty with lettuce, tomato, and special sauce.' },
    { id: 3, name: 'Spaghetti Carbonara', price: 11.99, category: 'Pasta', image: 'pasta.jpg', description: 'Creamy pasta with bacon and parmesan cheese.' },
    { id: 4, name: 'Vegetable Stir-Fry', price: 10.99, category: 'Vegetarian', image: 'stir_fry.jpg', description: 'Fresh vegetables stir-fried with tofu in savory sauce.' },
    { id: 5, name: 'Chicken Wings', price: 8.99, category: 'Appetizers', image: 'wings.jpg', description: 'Crispy chicken wings with choice of sauce: BBQ, Buffalo, or Honey Garlic.' },
    { id: 6, name: 'Caesar Salad', price: 7.99, category: 'Salad', image: 'salad.jpg', description: 'Fresh romaine lettuce, croutons, parmesan cheese with Caesar dressing.' }
  ];
  
  res.json({ success: true, data: menuItems });
});

// Get menu item by ID
router.get('/menu-items/:id', (req, res) => {
  // In a real app, this would fetch from a database
  const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Pizza', image: 'margherita_pizza.avif', description: 'Classic cheese and tomato pizza with fresh basil.' },
    { id: 2, name: 'Classic Burger', price: 9.99, category: 'Burger', image: 'burger.jpg', description: 'Juicy beef patty with lettuce, tomato, and special sauce.' },
    { id: 3, name: 'Spaghetti Carbonara', price: 11.99, category: 'Pasta', image: 'pasta.jpg', description: 'Creamy pasta with bacon and parmesan cheese.' },
    { id: 4, name: 'Vegetable Stir-Fry', price: 10.99, category: 'Vegetarian', image: 'stir_fry.jpg', description: 'Fresh vegetables stir-fried with tofu in savory sauce.' },
    { id: 5, name: 'Chicken Wings', price: 8.99, category: 'Appetizers', image: 'wings.jpg', description: 'Crispy chicken wings with choice of sauce: BBQ, Buffalo, or Honey Garlic.' },
    { id: 6, name: 'Caesar Salad', price: 7.99, category: 'Salad', image: 'salad.jpg', description: 'Fresh romaine lettuce, croutons, parmesan cheese with Caesar dressing.' }
  ];
  
  const id = parseInt(req.params.id);
  const menuItem = menuItems.find(item => item.id === id);
  
  if (!menuItem) {
    return res.status(404).json({ success: false, message: 'Menu item not found' });
  }
  
  res.json({ success: true, data: menuItem });
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

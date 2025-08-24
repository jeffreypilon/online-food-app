const express = require('express');
const router = express.Router();

// Get all menu items
router.get('/', (req, res) => {
  // Mock data - in a real app, this would come from a database
  const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 10.99, category: 'Pizza', image: 'pizza1.jpg', description: 'Classic cheese and tomato pizza' },
    { id: 2, name: 'Pepperoni Pizza', price: 12.99, category: 'Pizza', image: 'pizza2.jpg', description: 'Pepperoni, cheese, and tomato sauce' },
    { id: 3, name: 'Vegetarian Burger', price: 9.99, category: 'Burger', image: 'burger1.jpg', description: 'Plant-based patty with lettuce and tomato' },
    { id: 4, name: 'Chicken Burger', price: 11.99, category: 'Burger', image: 'burger2.jpg', description: 'Grilled chicken with special sauce' },
    { id: 5, name: 'French Fries', price: 4.99, category: 'Sides', image: 'fries.jpg', description: 'Crispy golden fries with seasoning' }
  ];
  
  res.json({ success: true, data: menuItems });
});

// Get menu item by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // Mock data lookup - in a real app, this would query a database
  const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 10.99, category: 'Pizza', image: 'pizza1.jpg', description: 'Classic cheese and tomato pizza' },
    { id: 2, name: 'Pepperoni Pizza', price: 12.99, category: 'Pizza', image: 'pizza2.jpg', description: 'Pepperoni, cheese, and tomato sauce' },
    { id: 3, name: 'Vegetarian Burger', price: 9.99, category: 'Burger', image: 'burger1.jpg', description: 'Plant-based patty with lettuce and tomato' },
    { id: 4, name: 'Chicken Burger', price: 11.99, category: 'Burger', image: 'burger2.jpg', description: 'Grilled chicken with special sauce' },
    { id: 5, name: 'French Fries', price: 4.99, category: 'Sides', image: 'fries.jpg', description: 'Crispy golden fries with seasoning' }
  ];
  
  const item = menuItems.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({ success: false, message: 'Menu item not found' });
  }
  
  res.json({ success: true, data: item });
});

module.exports = router;

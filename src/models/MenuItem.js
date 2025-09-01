/**
 * MenuItem model representing food items available in the menu
 */

// Menu items data
const menuItems = [
  { 
    id: 1, 
    name: 'Tandoori Chicken', 
    price: 17.99, 
    category: 'International', 
    image: 'tandoori_chicken.jpg', 
    description: 'Spicy grilled chicken with a blend of Indian spices.' 
  },
  { 
    id: 2, 
    name: 'Margherita Pizza', 
    price: 12.99, 
    category: 'Pizza', 
    image: 'pizza.jpg', 
    description: 'Classic cheese and tomato pizza with fresh basil.' 
  },
  { 
    id: 3, 
    name: 'Classic Burger', 
    price: 9.99, 
    category: 'Burger', 
    image: 'burger.jpg', 
    description: 'Juicy beef patty with lettuce, tomato, and special sauce.' 
  },
  { 
    id: 4, 
    name: 'Spaghetti Carbonara', 
    price: 11.99, 
    category: 'Pasta', 
    image: 'pasta.jpg', 
    description: 'Creamy pasta with bacon and parmesan cheese.' 
  },
  { 
    id: 5, 
    name: 'Vegetable Stir-Fry', 
    price: 10.99, 
    category: 'Vegetarian', 
    image: 'stir_fry.jpg', 
    description: 'Fresh vegetables stir-fried with tofu in savory sauce.' 
  },
  { 
    id: 6, 
    name: 'Chicken Wings', 
    price: 8.99, 
    category: 'Appetizers', 
    image: 'wings.jpg', 
    description: 'Crispy chicken wings with choice of sauce: BBQ, Buffalo, or Honey Garlic.' 
  },
  { 
    id: 7, 
    name: 'Caesar Salad', 
    price: 7.99, 
    category: 'Salad', 
    image: 'salad.jpg', 
    description: 'Fresh romaine lettuce, croutons, parmesan cheese with Caesar dressing.' 
  }
];

// Methods to work with menuItems
const getAllItems = () => {
  return menuItems;
};

const getItemById = (id) => {
  return menuItems.find(item => item.id === id);
};

const getItemsByCategory = (category) => {
  return menuItems.filter(item => item.category === category);
};

module.exports = {
  getAllItems,
  getItemById,
  getItemsByCategory
};

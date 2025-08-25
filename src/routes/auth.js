const express = require('express');
const router = express.Router();

// Mock user database
const users = [
  { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin' },
  { id: 2, email: 'user@example.com', password: 'user123', name: 'Regular User', role: 'user' },
  { id: 3, email: 'jeffjones@yahoo.com', password: 'Password123!', name: 'Regular User', role: 'user' }
];

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Validation
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }
  
  // Find user (in a real app, you would hash passwords)
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
  
  // In a real app, you would generate a JWT token here
  const userData = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
  
  res.json({ success: true, data: userData });
});

// Register route
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  
  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
  }
  
  // Check if user already exists
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'User with this email already exists' });
  }
  
  // Create new user (in a real app, you would hash passwords)
  const newUser = {
    id: users.length + 1,
    email,
    password,
    name,
    role: 'user'
  };
  
  // In a real app, you would save to a database
  users.push(newUser);
  
  // In a real app, you would generate a JWT token here
  const userData = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role
  };
  
  res.status(201).json({ success: true, data: userData });
});

// Logout route (would invalidate token in a real app)
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { validateLoginInput } = require('../middleware/validation');

// Login route
router.post('/login', validateLoginInput, (req, res) => {
  const { email, password } = req.body;
  
  // Mock authentication logic
  // In a real app, this would verify credentials against a database
  if (email === 'admin@example.com' && password === 'password123') {
    return res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      user: { email, role: 'admin' }
    });
  }
  
  return res.status(401).json({ 
    success: false, 
    message: 'Invalid credentials' 
  });
});

// Logout route
router.post('/logout', (req, res) => {
  // Mock logout logic
  // In a real app with sessions, this would destroy the session
  res.status(200).json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
});

module.exports = router;

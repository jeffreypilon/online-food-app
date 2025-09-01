const express = require('express');
const router = express.Router();
const { User, findUserByEmailAndPassword } = require('../models/User');

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Validation
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  // Find user using the User model
  const user = findUserByEmailAndPassword(email, password);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
  
  // Store user in session
  req.session.user = {
    email: user.getEmail(),
    firstName: user.getFirstName(),
    lastName: user.getLastName(),
    fullName: user.getFullName()
  };

  console.log("User logged in:", req.session.user);

  // In a real app with JWT, you'd still return the token
  // But we're using sessions here, so we just return user info
  
  res.json({ 
    success: true, 
    data: {
      email: user.getEmail(),
      name: user.getFullName(),
      firstName: user.getFirstName(),
      lastName: user.getLastName()
    } 
  });
});

// Logout route
router.post('/logout', (req, res) => {
  // Clear user from session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Failed to logout' });
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// Get current user info
router.get('/me', (req, res) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  
  res.json({ success: true, data: req.session.user });
});

// // Logout route (would invalidate token in a real app)
// router.post('/logout', (req, res) => {
//   res.json({ success: true, message: 'Logged out successfully' });
// });

module.exports = router;

const express = require('express');
const router = express.Router();
const path = require('path');

// Import other route modules
const authRoutes = require('./auth');
const menuRoutes = require('./menu');
const orderRoutes = require('./order');

// Use route modules
router.use('/auth', authRoutes);
router.use('/menu', menuRoutes);
router.use('/order', orderRoutes);

// Home page route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Login page route
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../login.html'));
});

// Catch-all route for any undefined routes
router.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

module.exports = router;

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

// Initialize express app
const app = express();

// Environment variables
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined')); // Logging
app.use(cors()); // Enable CORS
app.use(helmet({ contentSecurityPolicy: false })); // Security headers
app.use(compression()); // Compress responses
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/menu.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/cart.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/checkout.html'));
});

// API Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Auth Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: NODE_ENV === 'production' ? 'An error occurred' : err.message,
    ...(NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Start server only if directly executed (not when required/imported)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to access the application`);
  });
}

module.exports = app;

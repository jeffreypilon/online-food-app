// Middleware for form validation

// Validate login input
const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide a valid email address' 
    });
  }
  
  // Password length validation
  if (password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: 'Password must be at least 6 characters long' 
    });
  }
  
  next();
};

// Validate order input
const validateOrderInput = (req, res, next) => {
  const { items, address, paymentMethod } = req.body;
  
  // Basic validation
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ 
      success: false, 
      message: 'Order must contain at least one item' 
    });
  }
  
  if (!address) {
    return res.status(400).json({ 
      success: false, 
      message: 'Delivery address is required' 
    });
  }
  
  if (!paymentMethod) {
    return res.status(400).json({ 
      success: false, 
      message: 'Payment method is required' 
    });
  }
  
  // Validate each item
  for (const item of items) {
    if (!item.id || !item.quantity || item.quantity < 1) {
      return res.status(400).json({ 
        success: false, 
        message: 'Each item must have a valid ID and quantity' 
      });
    }
  }
  
  next();
};

module.exports = {
  validateLoginInput,
  validateOrderInput
};

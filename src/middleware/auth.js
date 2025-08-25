/**
 * Authentication middleware
 */

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  
  // User is not authenticated
  if (req.xhr || req.headers.accept.indexOf('json') !== -1) {
    // For AJAX/API requests, return 401 Unauthorized
    return res.status(401).json({ success: false, message: 'Authentication required' });
  } else {
    // For regular requests, redirect to login page
    return res.redirect('/login');
  }
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  
  // User is not an admin
  if (req.xhr || req.headers.accept.indexOf('json') !== -1) {
    // For AJAX/API requests, return 403 Forbidden
    return res.status(403).json({ success: false, message: 'Admin access required' });
  } else {
    // For regular requests, redirect to unauthorized page
    return res.redirect('/unauthorized');
  }
};

module.exports = {
  isAuthenticated,
  isAdmin
};

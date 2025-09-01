/**
 * Main server entry point that delegates to app.js
 * This is a simple wrapper that loads the app and starts the server
 */
const app = require('./app');
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Visit http://localhost:${PORT} to access the application`);
});
module.exports = app;

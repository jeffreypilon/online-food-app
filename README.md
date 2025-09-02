# ONLINE FOOD APP


## GitHub

Project source code may be cloned from the following GitHub repository:

https://github.com/jeffreypilon/online-food-app

## Login

Login with the following credentials:

email: admin@example.com
password: Admin123!

email: jeffjones@yahoo.com
password: Password123!



## Project Overview

The ONLINE FOOD APP is a web-based application designed to streamline the food ordering process. Users can browse menus, place orders, and make payments online. The application focuses on creating a responsive interface for users to browse food items, place orders, and manage profiles, while administrators handle menu updates and order tracking.

## Key Features

- **Responsive Menu Interface**: Browse menu items with detailed descriptions and images
- **Shopping Cart Management**: Add, update quantities, and remove items from your cart
- **Checkout System**: Complete orders with delivery information and payment options
- **User Authentication**: Secure login functionality
- **Persistent Cart**: Cart data is preserved between sessions using browser storage

## Technology Stack

- **Frontend**: HTML5, Tailwind CSS for responsive design
- **Backend**: JavaScript, Node.js with Express.js
- **Storage**: Session-based storage for cart, model-based data storage
- **Development**: Standard Node.js development workflow

## Project Structure

The project follows a structured directory layout for better organization:

```
/
├── .github/                    # GitHub configuration and workflows
├── public/                     # Static assets
│   ├── css/                    # Tailwind CSS styles
│   ├── js/                     # Client-side JavaScript
│   │   └── menu.js            # Menu functionality
│   ├── images/                 # Food images and assets
│   ├── index.html             # Home page
│   ├── menu.html              # Menu display page
│   ├── cart.html              # Shopping cart page
│   ├── checkout.html          # Order checkout page
│   ├── header.html            # Common header component
│   └── footer.html            # Common footer component
├── src/                        # Backend source code
│   ├── app.js                 # Express application setup
│   ├── server.js              # Server entry point
│   ├── middleware/            # Custom middleware
│   │   └── auth.js            # Authentication middleware
│   ├── models/                # Data models
│   │   ├── User.js            # User model with CRUD operations
│   │   ├── MenuItem.js        # Menu item model
│   │   └── Order.js           # Order model
│   └── routes/                # API routes
│       ├── api.js             # API endpoints
│       └── auth.js            # Authentication endpoints
├── views/                      # Template files (for future expansion)
├── tests/                      # Test files
├── package.json                # Node.js dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 16.x or higher)
- npm (version 8.x or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/online-food-app.git
   cd online-food-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server, run:
```
npm run dev
# or
npm start
```
The application will be available at `http://localhost:3000`.

### Building for Production

To build the application for production, run:
```
npm run build
```

This compiles Tailwind CSS and optimizes assets for production deployment.

## Development Workflow

1. Make changes to the source code
2. For CSS changes, run: `npm run css:build` to compile Tailwind
3. Test your changes locally
4. Commit your changes with descriptive messages

## Common Issues and Workarounds

1. **Tailwind CSS not compiling**: Run `npm run css:build` after modifying styles
2. **Port conflicts**: Use `PORT=3001 npm start` to specify alternative port
3. **Module not found**: Delete `node_modules` and `package-lock.json`, then run `npm install`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
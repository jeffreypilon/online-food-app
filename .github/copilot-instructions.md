# Copilot Instructions for Online Food App

## Project Overview

This repository contains an **Online Food Ordering Application** that streamlines the ordering process by allowing users to browse menus, place orders, and make payments online. The application focuses on creating a responsive web-based interface for users to browse food items in an online restaurant menu, place orders, and manage profiles, while administrators handle menu updates and order tracking.

**Key Objectives:**
- Streamline food ordering processes and improve customer experience
- Support operational efficiency for restaurants
- Minimize manual errors through form field validations
- Deliver responsive, interactive experience that enhances customer satisfaction
- Promote digital transformation in the food service industry

## Technology Stack

- **Frontend:** HTML5, Tailwind CSS for responsive UI design
- **Backend:** JavaScript, Node.js with Express.js server
- **Development:** Standard Node.js development workflow

## Project Structure and Architecture

### Expected Directory Layout
```
/
├── .github/                    # GitHub configuration and workflows
├── public/                     # Static assets (HTML, CSS, images)
│   ├── index.html             # Main landing page
│   ├── css/                   # Compiled CSS and custom styles
│   ├── js/                    # Client-side JavaScript
│   └── images/                # Static images and assets
├── src/                       # Source code
│   ├── server.js              # Main Express server entry point
│   ├── routes/                # Express route handlers
│   ├── middleware/            # Custom middleware functions
│   ├── models/                # Data models and database schemas
│   └── utils/                 # Utility functions and helpers
├── views/                     # Template files (if using templating engine)
├── tests/                     # Test files
├── package.json               # Node.js dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── .env.example               # Environment variables template
└── README.md                  # Project documentation
```

### Key Configuration Files
- `package.json`: Contains npm scripts, dependencies, and project metadata
- `tailwind.config.js`: Tailwind CSS configuration for styling
- `.env`: Environment variables (not committed, use .env.example as template)
- `.gitignore`: Already configured for Node.js projects with Tailwind exclusions

## Build and Development Workflow

### Prerequisites
- **Node.js**: Version 16.x or higher (check with `node --version`)
- **npm**: Version 8.x or higher (check with `npm --version`)

### Essential Commands (run in order)

1. **Initial Setup** (always run after cloning):
   ```bash
   npm install
   ```

2. **Development Server**:
   ```bash
   npm run dev
   # or
   npm start
   ```
   - Default port is typically 3000 or 8000
   - Server will auto-reload on file changes

3. **Build for Production**:
   ```bash
   npm run build
   ```
   - Compiles Tailwind CSS
   - Optimizes assets for production

4. **CSS Development** (Tailwind):
   ```bash
   npm run css:build
   # or
   npm run tailwind:build
   ```

### Testing and Validation

1. **Run Tests**:
   ```bash
   npm test
   # or
   npm run test:watch  # for continuous testing
   ```

2. **Linting**:
   ```bash
   npm run lint          # Check for issues
   npm run lint:fix      # Auto-fix issues
   ```

3. **Code Formatting**:
   ```bash
   npm run format        # Format code
   ```

### Common Issues and Workarounds

1. **Tailwind CSS not compiling**: Always run `npm run css:build` after modifying styles
2. **Port conflicts**: Use `PORT=3001 npm start` to specify alternative port
3. **Permission errors**: Run `npm audit fix` if encountering package vulnerabilities
4. **Module not found**: Delete `node_modules` and `package-lock.json`, then run `npm install`

## Development Guidelines

### File Locations for Common Tasks

- **API routes**: Add to `src/routes/` directory
- **Database models**: Place in `src/models/`
- **Static assets**: Store in `public/` directory
- **Custom CSS**: Add to `public/css/` or use Tailwind utility classes
- **Client-side JavaScript**: Place in `public/js/`
- **Server configuration**: Modify `src/server.js`

### Form Validation
The application emphasizes form field validations to minimize manual errors. When implementing forms:
- Use HTML5 validation attributes
- Implement client-side JavaScript validation
- Add server-side validation in route handlers
- Provide clear error messages to users

### Responsive Design
- Use Tailwind CSS utility classes for responsive design
- Test on mobile, tablet, and desktop viewports
- Follow mobile-first design principles

## Validation and Quality Checks

### Pre-commit Checklist
1. Run `npm run lint` - must pass without errors
2. Run `npm test` - all tests must pass
3. Run `npm run build` - build must complete successfully
4. Verify responsive design on different screen sizes
5. Test form validations and error handling

### Manual Testing Steps
1. Start development server: `npm start`
2. Navigate to `http://localhost:3000` (or configured port)
3. Test main user flows:
   - Browse menu items
   - Add items to cart
   - User registration/login
   - Order placement process
   - Admin functions (if applicable)

### Performance Considerations
- Optimize images before adding to `public/images/`
- Use Tailwind's purge functionality to minimize CSS bundle size
- Implement lazy loading for menu items if dataset is large

## CI/CD and GitHub Workflows

When GitHub Actions are configured, typical workflows include:
- **Build verification**: Runs `npm install` and `npm run build`
- **Testing**: Executes `npm test`
- **Linting**: Runs `npm run lint`
- **Deployment**: Deploys to staging/production environments

Always ensure your changes pass all CI checks before requesting review.

## Dependencies and Environment

### Required Environment Variables
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- Database connection strings (if using external database)

### Development vs Production
- Development: Uses live reload, unminified assets, detailed error messages
- Production: Minified assets, error handling, security headers enabled

## Key Reminders

1. **Always run `npm install`** before starting development
2. **Use Tailwind utility classes** instead of custom CSS when possible
3. **Validate forms both client and server-side** to minimize errors
4. **Test responsive design** on multiple devices
5. **Run all validation commands** before committing changes
6. **Follow RESTful API conventions** for route design
7. **Use meaningful commit messages** describing the change

Trust these instructions and only search for additional information if these instructions are incomplete or incorrect. The workflow described here is optimized for this project's technology stack and requirements.
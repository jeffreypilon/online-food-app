//import { Order } from './order.js';

/**
 * Menu page functionality
 * Loads menu items from the API and renders them on the page
 */

/**
 * Import the Order class from the Order.js file
 * This is used to manage cart functionality
 */

// Create cart object with methods
const cartFunctions = {
    addItem: function(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1
            });
        }
    },
    getItems: function() {
        return this.items;
    },
    getItemCount: function() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    getTotal: function() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
};

// Initialize cart
let cart;
try {   
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
        // Create cart with data from session storage but with functions from cartFunctions
        const cartData = JSON.parse(savedCart);
        cart = Object.create(cartFunctions);
        cart.items = cartData.items || [];
    } else {
        // Create new cart with empty items array
        cart = Object.create(cartFunctions);
        cart.items = [];
    }
} catch (error) {
    console.error('Error loading cart from session storage:', error);
    cart = Object.create(cartFunctions);
    cart.items = [];
}


document.addEventListener('DOMContentLoaded', () => {
    // Fetch menu items from API
    fetch('/api/menu-items')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                renderMenuItems(data.data);
            } else {
                showError('Failed to load menu items');
            }
        })
        .catch(error => {
            console.error('Error fetching menu items:', error);
            showError('Failed to load menu items. Please try again later.');
        });
});

/**
 * Renders menu items in the menu container
 * @param {Array} menuItems - Array of menu item objects
 */
function renderMenuItems(menuItems) {
    const menuContainer = document.getElementById('menu-container');
    
    // Clear any existing content
    menuContainer.innerHTML = '';
    
    // Create and append menu item elements
    menuItems.forEach(item => {
        const menuItemElement = createMenuItemElement(item);
        menuContainer.appendChild(menuItemElement);
    });
}

/**
 * Creates a menu item element based on the template
 * @param {Object} item - Menu item object with id, name, price, etc.
 * @returns {HTMLElement} The created menu item element
 */
function createMenuItemElement(item) {
    // Create the container div
    const menuItem = document.createElement('div');
    menuItem.className = 'bg-white rounded-lg shadow-md overflow-hidden';
    menuItem.setAttribute('data-item-id', item.id);
    
    // Create the image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'h-48 bg-gray-300 flex items-center justify-center';
    
    // Add the image or placeholder
    if (item.image) {
        const img = document.createElement('img');
        img.src = `images/${item.image}`;
        img.alt = item.name;
        img.className = 'w-full h-full object-cover';
        imageContainer.appendChild(img);
    } else {
        const span = document.createElement('span');
        span.className = 'text-gray-500';
        span.textContent = 'Food Image';
        imageContainer.appendChild(span);
    }
    
    // Create the content div
    const content = document.createElement('div');
    content.className = 'p-4';
    
    // Add the title
    const title = document.createElement('h3');
    title.className = 'text-xl font-semibold text-gray-800';
    title.textContent = item.name;
    
    // Add the description
    const description = document.createElement('p');
    description.className = 'text-gray-600 mt-2';
    description.textContent = item.description;
    
    // Add the price and button container
    const priceButtonContainer = document.createElement('div');
    priceButtonContainer.className = 'mt-4 flex justify-between items-center';
    
    // Add the price
    const price = document.createElement('span');
    price.className = 'text-gray-800 font-bold';
    price.textContent = `$${item.price.toFixed(2)}`;
    
    // Add the add to cart button
    const button = document.createElement('button');
    button.className = 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition';
    button.textContent = 'Add to Cart';
    button.addEventListener('click', () => addToCart(item));
    
    // Assemble the price and button container
    priceButtonContainer.appendChild(price);
    priceButtonContainer.appendChild(button);
    
    // Assemble the content div
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(priceButtonContainer);
    
    // Assemble the menu item
    menuItem.appendChild(imageContainer);
    menuItem.appendChild(content);
    
    return menuItem;
}

/**
 * Adds an item to the cart
 * @param {Object} item - Menu item to add to cart
 */
function addToCart(item) {
    console.log(`Adding ${item.name} to cart`);

    // Add the item to the cart object
    cart.addItem(item);

    // Save the updated cart to session storage
    try {
        // Only save the data part, not the methods
        sessionStorage.setItem('cart', JSON.stringify({
            items: cart.items
        }));
    } catch (error) {
        console.error('Error saving cart to session storage:', error);
    }

    // Show a notification instead of an alert
    showNotification(`Added ${item.name} to cart!`);

    // Update the cart count display if it exists
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.getItemCount();
        cartCountElement.classList.remove('hidden');
    }
}

/**
 * Shows a notification message
 * @param {string} message - Message to display
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-50';
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Shows an error message on the page
 * @param {string} message - Error message to display
 */
function showError(message) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = `
        <div class="col-span-3 text-center py-8">
            <p class="text-red-500">${message}</p>
            <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" 
                    onclick="location.reload()">
                Try Again
            </button>
        </div>
    `;
}
    // if (cartCountElement && cartCountElement.parentElement) {
    //     cartCountElement.parentElement.appendChild(viewCartButton);
    // }




/**
 * Shows an error message on the page
 * @param {string} message - Error message to display
 */
// function showError(message) {
//     const menuContainer = document.getElementById('menu-container');
//     menuContainer.innerHTML = `
//         <div class="col-span-3 text-center py-8">
//             <p class="text-red-500">${message}</p>
//             <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" 
//                     onclick="location.reload()">
//                 Try Again
//             </button>
//         </div>
//     `;
// }

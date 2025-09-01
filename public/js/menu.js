//import { Order } from './order.js';

/**
 * Menu page functionality
 * Loads menu items from the API and renders them on the page
 */

/**
 * Import the Order class from the Order.js file
 * This is used to manage cart functionality
 */

// Initialize cart if it doesn't exist in session storage
let cart;
try {   
    const savedCart = sessionStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart) : {
        items: [],
        addItem: function(item) {
            // Check if item already exists in cart
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
} catch (error) {
    console.error('Error loading cart from session storage:', error);
    cart = {
        items: [],
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
    console.log(`Added ${item.name} to cart`);

    // show an alert with the item details
    alert(`Added ${item.name} to cart!`);

    // Add the item to the cart object
    //cart.addItem(item);

    // Save the updated cart to session storage
    try {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to session storage:', error);
    }

    // Update the cart count display if it exists
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.getItemCount();
        cartCountElement.classList.remove('hidden');
    }

    // Create a function to show all items in the cart
    function showCartItems() {
        const items = cart.getItems();
        
        if (items.length === 0) {
            alert('Your cart is empty');
            return;
        }
        
        let cartMessage = 'Your cart contains:\n\n';
        
        items.forEach((item, index) => {
            cartMessage += `${index + 1}. ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}\n`;
        });
        
        cartMessage += `\nTotal: $${cart.getTotal().toFixed(2)}`;
        
        alert(cartMessage);
    }

    // Create a "View Cart" button that appears after adding an item
    const viewCartButton = document.createElement('button');
    viewCartButton.className = 'ml-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm';
    viewCartButton.textContent = 'View Cart';
    viewCartButton.addEventListener('click', showCartItems);

    // Find the cart count element's parent and append the button
    if (cartCountElement && cartCountElement.parentElement) {
        cartCountElement.parentElement.appendChild(viewCartButton);
    }


 

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

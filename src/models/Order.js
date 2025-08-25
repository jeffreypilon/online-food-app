/**
 * Order Model
 * Represents a food order placed by a user
 */

const { User } = require('./User');
const { getItemById } = require('./MenuItem');

class Order {
    constructor(user = null) {
        this._orderID = this._generateOrderID();
        this._creationTime = new Date();
        this._customer = user;
        this._orderedItems = [];
        this._orderTotal = 0;
        this._orderStatus = 'new';
    }

    // Private helper method to generate unique order ID
    _generateOrderID() {
        const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const timestamp = Date.now().toString().slice(-6);
        return `ORD-${timestamp}-${randomPart}`;
    }

    // Getters
    getOrderID() {
        return this._orderID;
    }

    getCreationTime() {
        return this._creationTime;
    }

    getFormattedCreationTime() {
        const dt = this._creationTime;
        return {
            day: dt.getDate(),
            month: dt.getMonth() + 1, // Month is 0-indexed
            year: dt.getFullYear(),
            hour: dt.getHours(),
            minute: dt.getMinutes(),
            formatted: `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear()} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`
        };
    }

    getCustomer() {
        return this._customer;
    }

    getOrderedItems() {
        return [...this._orderedItems]; // Return a copy to prevent direct manipulation
    }

    getOrderTotal() {
        return this._orderTotal;
    }

    getOrderStatus() {
        return this._orderStatus;
    }

    // Setters
    setCustomer(user) {
        if (!(user instanceof User)) {
            throw new Error('Invalid user object');
        }
        this._customer = user;
    }

    setOrderStatus(status) {
        const validStatuses = ['new', 'processing', 'ready', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid order status');
        }
        this._orderStatus = status;
    }

    // Order management methods
    addItem(menuItem, quantity = 1) {
        if (!menuItem || !menuItem.id || !menuItem.price) {
            throw new Error('Invalid menu item');
        }
        
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        
        // Check if item already exists in order
        const existingItemIndex = this._orderedItems.findIndex(item => item.id === menuItem.id);
        
        if (existingItemIndex >= 0) {
            // Update quantity if item already exists
            this._orderedItems[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to order
            this._orderedItems.push({
                id: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: quantity
            });
        }
        
        // Recalculate total
        this._recalculateTotal();
    }

    removeItem(menuItemId) {
        const initialLength = this._orderedItems.length;
        this._orderedItems = this._orderedItems.filter(item => item.id !== menuItemId);
        
        if (this._orderedItems.length === initialLength) {
            throw new Error('Item not found in order');
        }
        
        // Recalculate total
        this._recalculateTotal();
    }

    updateItemQuantity(menuItemId, quantity) {
        if (quantity <= 0) {
            return this.removeItem(menuItemId);
        }
        
        const itemIndex = this._orderedItems.findIndex(item => item.id === menuItemId);
        
        if (itemIndex === -1) {
            throw new Error('Item not found in order');
        }
        
        this._orderedItems[itemIndex].quantity = quantity;
        
        // Recalculate total
        this._recalculateTotal();
    }

    // Helper method to recalculate order total
    _recalculateTotal() {
        this._orderTotal = this._orderedItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    }

    // Method to convert order to JSON for storage/transmission
    toJSON() {
        return {
            id: this._orderID,
            createdAt: this._creationTime,
            customerId: this._customer ? this._customer.getEmail() : null,
            items: this._orderedItems,
            total: this._orderTotal,
            status: this._orderStatus
        };
    }
}

// Mock orders database
const orders = [];

// Helper functions
const createOrder = (user) => {
    const order = new Order(user);
    orders.push(order);
    return order;
};

const getOrderById = (orderId) => {
    return orders.find(order => order.getOrderID() === orderId);
};

const getUserOrders = (userEmail) => {
    return orders.filter(order => 
        order.getCustomer() && order.getCustomer().getEmail() === userEmail
    );
};

module.exports = {
    Order,
    createOrder,
    getOrderById,
    getUserOrders
};

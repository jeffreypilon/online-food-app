/**
 * User Model
 * Represents a user in the system with basic profile information
 */

class User {
    constructor(firstName = '', lastName = '', email = '', password = '') {
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    // Getters
    getFirstName() {
        return this._firstName;
    }

    getLastName() {
        return this._lastName;
    }

    getEmail() {
        return this._email;
    }

    getPassword() {
        return this._password; // In a real app, this would need security considerations
    }

    getFullName() {
        return `${this._firstName} ${this._lastName}`;
    }

    getCreatedAt() {
        return this._createdAt;
    }

    getUpdatedAt() {
        return this._updatedAt;
    }

    // Setters
    setFirstName(firstName) {
        this._firstName = firstName;
        this._updatedAt = new Date();
    }

    setLastName(lastName) {
        this._lastName = lastName;
        this._updatedAt = new Date();
    }

    setEmail(email) {
        // Basic email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        this._email = email;
        this._updatedAt = new Date();
    }

    setPassword(password) {
        // Basic password validation
        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        this._password = password; // In a real app, this would be hashed
        this._updatedAt = new Date();
    }

    // Utility methods
    toJSON() {
        return {
            firstName: this._firstName,
            lastName: this._lastName,
            email: this._email,
            // Exclude password for security
            fullName: this.getFullName(),
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        };
    }

    // Static methods for creating users
    static fromJSON(json) {
        const user = new User(
            json.firstName,
            json.lastName,
            json.email,
            json.password
        );
        if (json.createdAt) user._createdAt = new Date(json.createdAt);
        if (json.updatedAt) user._updatedAt = new Date(json.updatedAt);
        return user;
    }
}

// Mock database of users (for development purposes)
const users = [
    new User('Admin', 'User', 'admin@example.com', 'Admin123!'),
    new User('John', 'Doe', 'john.doe@example.com', 'Password456!'),
    new User('Jeff', 'Jones', 'jeffjones@yahoo.com', 'Password123!')
];

// User related functions
const findUserByEmail = (email) => {
    return users.find(user => user.getEmail() === email);
};

const findUserByEmailAndPassword = (email, password) => {
    return users.find(user => 
        user.getEmail() === email && 
        user.getPassword() === password
    );
};

const createUser = (firstName, lastName, email, password) => {
    // Check if user already exists
    if (findUserByEmail(email)) {
        throw new Error('User with this email already exists');
    }
    
    const newUser = new User(firstName, lastName, email, password);
    users.push(newUser);
    return newUser;
};

module.exports = {
    User,
    findUserByEmail,
    findUserByEmailAndPassword,
    createUser
};

const fs = require('fs');
const bcrypt = require('bcrypt');
const readline = require('readline-sync');

const USERS_FILE = 'users.json';

// Function to load user data
function loadUsers() {
    try {
        return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } catch (error) {
        return [];
    }
}

// Function to save user data
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Function to register a new user
function registerUser() {
    console.log("\n--- User Registration ---");
    const name = readline.question("Enter your name: ");
    const email = readline.question("Enter your email: ");
    const password = readline.question("Enter your password: ", { hideEchoBack: true });

    let users = loadUsers();

    if (users.some(user => user.email === email)) {
        console.log("Email already registered. Try logging in.");
        return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ name, email, password: hashedPassword });

    saveUsers(users);
    console.log("Registration successful!");
}

// Function to login a user
function loginUser() {
    console.log("\n--- User Login ---");
    const email = readline.question("Enter your email: ");
    const password = readline.question("Enter your password: ", { hideEchoBack: true });

    let users = loadUsers();
    const user = users.find(user => user.email === email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        console.log("Invalid email or password.");
        return null;
    }

    console.log(`Login successful! Welcome, ${user.name}.`);
    return user;
}

// Function to display user menu
function userMenu(user) {
    while (true) {
        console.log("\n--- User Menu ---");
        console.log("1. View Profile");
        console.log("2. Logout");
        const choice = readline.question("Choose an option: ");

        if (choice === '1') {
            console.log(`\nName: ${user.name}`);
            console.log(`Email: ${user.email}`);
        } else if (choice === '2') {
            console.log("Logging out...");
            break;
        } else {
            console.log("Invalid option. Try again.");
        }
    }
}

// Main function to handle authentication flow
function main() {
    while (true) {
        console.log("\n--- Welcome to the Authentication System ---");
        console.log("1. Register");
        console.log("2. Login");
        console.log("3. Exit");

        const choice = readline.question("Choose an option: ");
        if (choice === '1') {
            registerUser();
        } else if (choice === '2') {
            const user = loginUser();
            if (user) userMenu(user);
        } else if (choice === '3') {
            console.log("Exiting...");
            break;
        } else {
            console.log("Invalid option. Try again.");
        }
    }
}

// Start the authentication system
main();

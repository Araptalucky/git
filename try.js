const bcrypt = require('bcryptjs');

const password = "mySecurePassword";
const saltRounds = 10;

// Hash the password
bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error("Error hashing password:", err);
    } else {
        console.log("Hashed Password:", hash);
        
        // Verify the password
        bcrypt.compare(password, hash, (err, result) => {
            if (result) {
                console.log("Password matches!");
            } else {
                console.log("Password does NOT match!");
            }
        });
    }
});

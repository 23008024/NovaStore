const bcrypt = require("bcrypt");
const { prisma } = require("../config/database");
const { generateToken } = require("../utils/jwt");

// Password must contain:
// - Minimum 8 characters
// - One uppercase letter
// - One lowercase letter
// - One number
// - One special character
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>/?])[A-Za-z\d@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>/?]{8,}$/;

const registerUser = async (name, email, password) => {

    // Remove spaces
    name = name.trim();
    email = email.trim().toLowerCase();
    password = password.trim();

    // Check blank fields
    if (!name || !email || !password) {
        throw new Error("All fields are required.");
    }

    // Email validation
    if (!email.endsWith("@gmail.com")) {
        throw new Error("Email must end with @gmail.com");
    }

    // Password validation
    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number and special character."
        );
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("Email already registered.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const token = generateToken(user.id);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    };
};

const loginUser = async (email, password) => {

    // Remove spaces
    email = email.trim().toLowerCase();
    password = password.trim();

    // Blank validation
    if (!email || !password) {
        throw new Error("Email and password cannot be blank.");
    }

    // Gmail validation
    if (!email.endsWith("@gmail.com")) {
        throw new Error("Email must end with @gmail.com");
    }

    // Find user
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid email or password.");
    }

    // Generate token
    const token = generateToken(user.id);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    };
};

module.exports = {
    registerUser,
    loginUser
};

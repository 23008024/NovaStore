const bcrypt = require("bcrypt");
const { prisma } = require("../config/database");
const { generateToken } = require("../utils/jwt");

// Password validation regex
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>/?])[A-Za-z\d@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>/?]{8,}$/;

const registerUser = async (name, email, password) => {

    // Remove extra spaces
    name = name.trim();
    email = email.trim();
    password = password.trim();

    // Check for blank fields
    if (!name || !email || !password) {
        throw new Error("All fields are required.");
    }

    // Email validation
    if (!email.endsWith("@gmail.com")) {
        throw new Error("Email must be a valid Gmail address.");
    }

    // Password validation
    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, number, and special character."
        );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
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

    // Generate JWT
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

    // Remove extra spaces
    email = email.trim();
    password = password.trim();

    // Check for blank fields
    if (!email || !password) {
        throw new Error("Email and password cannot be blank.");
    }

    // Validate Gmail address
    if (!email.endsWith("@gmail.com")) {
        throw new Error("Email must be a valid Gmail address.");
    }

    // Password format validation
    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, number, and special character."
        );
    }

    // Find user
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid email or password.");
    }

    // Generate JWT
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

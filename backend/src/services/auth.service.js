const bcrypt = require("bcrypt");
const crypto = require("crypto");

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
 
const registerUser = async (
    firstName,
    lastName,
    email,
    password,
    phoneCode,
    phone
) => {
    // Remove spaces
    firstName = firstName?.trim() || "";
    lastName = lastName?.trim() || "";
    email = email?.trim().toLowerCase() || "";
    password = password?.trim() || "";
    phoneCode = phoneCode?.trim() || "";
    phone = phone?.trim() || "";
 
    // Check blank fields
    if (!firstName || !lastName || !email || !password) {
        throw new Error("All fields are required.");
    }
 
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address.");
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
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneCode,
            phone,
 
            // No email verification service in this demo — auto-verified
            emailVerified: true
        }
    });
 
    // Generate JWT
    const token = generateToken(user.id);
 
    console.log("User created:", user.email);
 
    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneCode: user.phoneCode,
            phone: user.phone,
            role: user.role
        },
        token
    };
}; // ✅ registerUser ends here
 
const loginUser = async (email, password) => {
    // Remove spaces
    email = email.trim().toLowerCase();
    password = password.trim();
 
    // Blank validation
    if (!email || !password) {
        throw new Error("Email and password cannot be blank.");
    }
 
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address.");
    }
 
    // Find user
    const user = await prisma.user.findUnique({
        where: { email }
    });
 
    // User exists?
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
 
    // Return response
    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneCode: user.phoneCode,
            phone: user.phone,
            role: user.role
        },
        token
    };
};
 
const forgotPassword = async (email) => {
    email = email.trim().toLowerCase();
 
    const user = await prisma.user.findUnique({
        where: { email }
    });
 
    // Don't reveal whether the email exists
    if (!user) {
        return {
            message:
                "If an account with that email exists, a reset link has been sent."
        };
    }
 
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
 
    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetToken: token,
            resetTokenExpiry: expiry
        }
    });
 
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
 

 
    return {
        message:
            "If an account with that email exists, a reset link has been sent.",
        // Only exposed so portfolio reviewers can test the flow without an inbox.
        // Remove this field before using in a real production app.
        ...(process.env.NODE_ENV !== "production" && { resetLink })
    };
};
 
const resetPassword = async (token, password) => {
    const user = await prisma.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExpiry: {
                gt: new Date()
            }
        }
    });
 
    if (!user) {
        throw new Error("Invalid or expired reset link.");
    }
 
    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number and special character."
        );
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null
        }
    });
 
    return {
        message: "Password has been reset successfully."
    };
}; // ✅ resetPassword ends here
 
const verifyPhone = async (phoneCode, phone, otp) => {
    const otpRecord = await prisma.oTP.findFirst({
        where: {
            phone: `${phoneCode}${phone}`,
            code: otp,
            verified: false,
            expiresAt: {
                gt: new Date()
            }
        }
    });
 
    if (!otpRecord) {
        throw new Error("Invalid or expired OTP.");
    }
 
    await prisma.user.update({
        where: { phone },
        data: { phoneVerified: true }
    });
 
    await prisma.oTP.update({
        where: { id: otpRecord.id },
        data: { verified: true }
    });
 
    return {
        message: "Phone verified successfully."
    };
};
 
module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    verifyPhone
};


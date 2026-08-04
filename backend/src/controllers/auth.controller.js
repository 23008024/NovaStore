const {
    registerUser,
    loginUser,
    forgotPassword: forgotPasswordService,
    resetPassword,
    verifyEmail
} = require("../services/auth.service");

// =========================
// Register
// =========================
const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            phoneCode,
            phone
        } = req.body;

        const result = await registerUser(
            firstName,
            lastName,
            email,
            password,
            phoneCode,
            phone
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

// =========================
// Login
// =========================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await loginUser(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }
};

// =========================
// Forgot Password
// =========================
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const result = await forgotPasswordService(email);

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {

        console.error("Forgot Password Error:", error);

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

// =========================
// Reset Password
// =========================
const resetPasswordController = async (req, res) => {
    try {
        const { token, password } = req.body;

        const result = await resetPassword(token, password);

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {

        console.error("Reset Password Error:", error);

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

// =========================
// Verify Email
// =========================
const verifyEmailController = async (req, res) => {
    try {
        const { email, code } = req.body;

        const result = await verifyEmail(email, code);

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {

        console.error("Verify Email Error:", error);

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword: resetPasswordController,
    verifyEmail: verifyEmailController

};




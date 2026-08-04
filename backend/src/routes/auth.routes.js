const express = require("express");

const {
    register,
    login,
    forgotPassword,
    resetPassword,
    verifyEmail
} = require("../controllers/auth.controller");

const router = express.Router();

router.post(
    "/register",
    register
);

router.post(
    "/login",
    login
);

// NEW - Forgot Password
router.post(
    "/forgot-password",
    forgotPassword
);

// NEW - Reset Password
router.post(
    "/reset-password",
    resetPassword
);
router.post("/verify-email", verifyEmail);

module.exports = router;


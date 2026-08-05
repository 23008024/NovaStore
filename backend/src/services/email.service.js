console.log("🚀 email.service.js loaded");

const nodemailer = require("nodemailer");

// ==========================================
// Gmail Transporter
// ==========================================
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ==========================================
// Verify SMTP Connection
// ==========================================
console.log("🚀 Running transporter.verify...");

(async () => {
    try {
        await transporter.verify();
        console.log("✅ Gmail SMTP connected successfully.");
    } catch (err) {
        console.error("❌ SMTP VERIFY FAILED");
        console.error(err);
    }
})();

// ==========================================
// Password Reset Email
// ==========================================
const sendResetEmail = async (email, link) => {
    try {
        console.log("==================================");
        console.log("Sending password reset email...");
        console.log("Recipient:", email);
        console.log("Sender:", process.env.EMAIL_USER);
        console.log("Reset Link:", link);

        const info = await transporter.sendMail({
            from: `"NovaStore" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "NovaStore Password Reset",
            html: `
                <h2>Password Reset</h2>

                <p>You requested to reset your password.</p>

                <p>
                    Click the link below to reset your password:
                </p>

                <a href="${link}">
                    Reset Password
                </a>

                <p>
                    This link expires in 30 minutes.
                </p>
            `
        });

        console.log("✅ Password reset email sent successfully.");
        console.log("Message ID:", info.messageId);
        console.log("Response:", info.response);
        console.log("==================================");

    } catch (error) {

        console.error("==================================");
        console.error("❌ Password reset email failed");
        console.error(error);
        console.error("==================================");

        throw error;
    }
};

// ==========================================
// Email Verification
// ==========================================
const sendVerificationEmail = async (email, code) => {
    try {

        console.log("==================================");
        console.log("Sending verification email...");
        console.log("Recipient:", email);
        console.log("Sender:", process.env.EMAIL_USER);
        console.log("OTP:", code);

        const info = await transporter.sendMail({
            from: `"NovaStore" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your NovaStore account",
            html: `
                <h2>Welcome to NovaStore</h2>

                <p>Thank you for registering.</p>

                <p>Your verification code is:</p>

                <h1 style="letter-spacing:5px;">
                    ${code}
                </h1>

                <p>This code expires in 10 minutes.</p>
            `
        });

        console.log("✅ Verification email sent successfully.");
        console.log("Message ID:", info.messageId);
        console.log("Response:", info.response);
        console.log("==================================");

    } catch (error) {

        console.error("==================================");
        console.error("❌ Verification email failed");
        console.error(error);
        console.error("==================================");

        throw error;
    }
};

// ==========================================
// Exports
// ==========================================
module.exports = {
    sendResetEmail,
    sendVerificationEmail
};

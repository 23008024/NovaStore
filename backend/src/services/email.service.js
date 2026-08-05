const { Resend } = require("resend");

console.log("🚀 email.service.js loaded");

const resend = new Resend(process.env.RESEND_API_KEY);

// ==========================================
// Password Reset Email
// ==========================================
const sendResetEmail = async (email, link) => {
    try {
        console.log("==================================");
        console.log("Sending password reset email...");
        console.log("Recipient:", email);
        console.log("Reset Link:", link);

        const response = await resend.emails.send({
            from: "NovaStore <onboarding@resend.dev>",
            to: email,
            subject: "NovaStore Password Reset",
            html: `
                <h2>Password Reset</h2>

                <p>You requested to reset your password.</p>

                <p>
                    <a href="${link}">
                        Reset Password
                    </a>
                </p>

                <p>This link expires in 30 minutes.</p>
            `
        });

        console.log("✅ Password reset email sent.");
        console.log(response);
        console.log("==================================");

    } catch (error) {

        console.error("❌ Password reset email failed");
        console.error(error);
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

        const response = await resend.emails.send({
            from: "NovaStore <onboarding@resend.dev>",
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

        console.log("✅ Verification email sent.");
        console.log(response);
        console.log("==================================");

    } catch (error) {

        console.error("❌ Verification email failed");
        console.error(error);
        throw error;

    }
};

module.exports = {
    sendResetEmail,
    sendVerificationEmail
};

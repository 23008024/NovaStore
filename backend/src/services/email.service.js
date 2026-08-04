console.log("🚀 email.service.js loaded");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
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

// Password Reset Email
const sendResetEmail = async (email, link) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
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
};

// Email Verification
const sendVerificationEmail = async (email, code) => {
    try {

        console.log("==================================");
        console.log("Sending verification email...");
        console.log("Recipient:", email);
        console.log("Sender:", process.env.EMAIL_USER);
        console.log("OTP:", code);

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your NovaStore account",
            html: `
                <h2>Welcome to NovaStore</h2>

                <p>Thank you for registering.</p>

                <p>Your verification code is:</p>

                <h1 style="letter-spacing:5px;">${code}</h1>

                <p>This code expires in 10 minutes.</p>
            `
        });

        console.log("✅ Verification email sent successfully.");
        console.log("Message ID:", info.messageId);
        console.log("Response:", info.response);
        console.log("==================================");

    } catch (error) {

        console.error("==================================");
        console.error("❌ Email sending failed");
        console.error(error);
        console.error("==================================");

        throw error;
    }
};

module.exports = {
    sendResetEmail,
    sendVerificationEmail
};

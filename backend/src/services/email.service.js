const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILJET_API_KEY,
        pass: process.env.MAILJET_SECRET_KEY,
    },
});

// Verify SMTP connection when the app starts
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Mailjet SMTP Error:", error);
    } else {
        console.log("✅ Mailjet SMTP is ready");
    }
});

const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
            to,
            subject,
            html,
        });

        console.log("✅ Email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Email send failed:");
        console.error(error);
        throw error;
    }
};

const sendResetEmail = async (email, resetLink) => {
    return sendEmail({
        to: email,
        subject: "Reset your NovaStore password",
        html: `
            <h2>Password Reset</h2>
            <p>You requested a password reset.</p>
            <a href="${resetLink}">Reset Password</a>
            <p>This link expires soon.</p>
        `,
    });
};

const sendVerificationEmail = async (email, code) => {
    return sendEmail({
        to: email,
        subject: "Verify your NovaStore account",
        html: `
            <h2>Welcome to NovaStore</h2>
            <p>Your verification code is:</p>
            <h1>${code}</h1>
        `,
    });
};

module.exports = {
    sendEmail,
    sendResetEmail,
    sendVerificationEmail,
};

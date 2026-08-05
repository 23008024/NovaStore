const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILJET_API_KEY,
        pass: process.env.MAILJET_SECRET_KEY
    }
});


const sendEmail = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
        to,
        subject,
        html
    });
};


const sendResetEmail = async (email, resetLink) => {
    await sendEmail({
        to: email,
        subject: "Reset your NovaStore password",
        html: `
            <h2>Password Reset</h2>
            <p>You requested a password reset.</p>
            <a href="${resetLink}">
                Reset Password
            </a>
            <p>This link expires soon.</p>
        `
    });
};


const sendVerificationEmail = async (email, code) => {
    await sendEmail({
        to: email,
        subject: "Verify your NovaStore account",
        html: `
            <h2>Welcome to NovaStore</h2>
            <p>Your verification code is:</p>
            <h1>${code}</h1>
        `
    });
};


module.exports = {
    sendEmail,
    sendResetEmail,
    sendVerificationEmail
};

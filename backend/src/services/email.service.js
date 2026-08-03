const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((error) => {
    if (error) {
        console.error("SMTP ERROR:");
        console.error(error);
    } else {
        console.log("✅ Gmail SMTP connected successfully.");
    }
});

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
    console.log("==================================");
    console.log("Sending verification email...");
    console.log("Recipient:", email);
    console.log("Sender:", process.env.EMAIL_USER);
    console.log("OTP:", code);

    try {
        console.log("Calling transporter.sendMail()...");

        const info = await transporter.sendMail({
            from: `"NovaStore" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your NovaStore account",
            html: `
                <h2>Welcome to NovaStore</h2>
                <p>Your verification code is:</p>
                <h1>${code}</h1>
            `
        });

        console.log("sendMail returned");
        console.log(info);
        console.log("✅ Verification email sent.");

    } catch (error) {
        console.error("❌ Email sending failed:");
        console.error(error);
        throw error;
    }
};

module.exports = {
    sendResetEmail,
    sendVerificationEmail
};

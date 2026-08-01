const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

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

module.exports = {
    sendResetEmail
};

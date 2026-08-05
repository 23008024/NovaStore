const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
);

const sendEmail = async ({ to, subject, html }) => {
    try {
        const result = await mailjet
            .post("send", { version: "v3.1" })
            .request({
                Messages: [
                    {
                        From: {
                            Email: process.env.MAIL_FROM_EMAIL,
                            Name: process.env.MAIL_FROM_NAME
                        },
                        To: [
                            {
                                Email: to
                            }
                        ],
                        Subject: subject,
                        HTMLPart: html
                    }
                ]
            });

        console.log("✅ Mailjet API email sent");
        return result.body;

    } catch (error) {
        console.error("❌ Mailjet API Error:");

        if (error.statusCode) {
            console.error("Status:", error.statusCode);
        }

        if (error.response && error.response.body) {
            console.error(JSON.stringify(error.response.body, null, 2));
        } else {
            console.error(error);
        }

        throw error;
    }
};

const sendVerificationEmail = async (email, code) => {
    return sendEmail({
        to: email,
        subject: "Verify your NovaStore account",
        html: `
            <h2>Welcome to NovaStore</h2>
            <p>Your verification code is:</p>
            <h1>${code}</h1>
            <p>This code expires in 10 minutes.</p>
        `
    });
};

const sendResetEmail = async (email, resetLink) => {
    return sendEmail({
        to: email,
        subject: "Reset your NovaStore password",
        html: `
            <h2>Password Reset</h2>
            <p>Click the button below to reset your password.</p>
            <p>
                <a href="${resetLink}">
                    Reset Password
                </a>
            </p>
            <p>This link expires in 30 minutes.</p>
        `
    });
};

module.exports = {
    sendEmail,
    sendVerificationEmail,
    sendResetEmail

};



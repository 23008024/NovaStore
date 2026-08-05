const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
    try {
        // Portfolio demo restriction for Resend's development domain
        if (
            process.env.MAIL_FROM_EMAIL === "onboarding@resend.dev" &&
            to.toLowerCase() !== "mudaunaftali@gmail.com"
        ) {
            throw new Error(
                "Portfolio Demo: This application uses Resend's free development environment. Verification and password reset emails are available only for the developer's verified email address."
            );
        }

        const result = await resend.emails.send({
            from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_EMAIL}>`,
            to,
            subject,
            html
        });

        console.log("✅ Resend email sent");
        console.log(result);

        return result;

    } catch (error) {

        console.error("❌ Resend Error");

        if (error.statusCode) {
            console.error("Status:", error.statusCode);
        }

        console.error(error);

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
}

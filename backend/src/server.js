require("dotenv").config();

const app = require("./app");
const { connectDatabase } = require("./config/database");

// Initialize email service
console.log("RESEND_API_KEY loaded:", !!process.env.RESEND_API_KEY);
console.log("MAIL_FROM_EMAIL:", process.env.MAIL_FROM_EMAIL);
console.log("MAIL_FROM_EMAIL:", process.env.MAIL_FROM_EMAIL);
console.log("MAIL_FROM_NAME:", process.env.MAIL_FROM_NAME);

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log("--------------------------------");
            console.log(" NovaStore Backend Started ");
            console.log(` Server running on port ${PORT}`);
            console.log("--------------------------------");
        });
    } catch (error) {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
};

startServer();

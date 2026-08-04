require("dotenv").config();

const app = require("./app");
const { connectDatabase } = require("./config/database");

// Force email service to initialize and verify SMTP
require("./services/email.service");

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", !!process.env.EMAIL_PASS);

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

const app = require("./app");
const { connectDatabase } = require("./config/database");
require("dotenv").config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", !!process.env.EMAIL_PASS);


const PORT = process.env.PORT || 5000;


const startServer = async () => {

    await connectDatabase();


    app.listen(PORT, () => {

        console.log("--------------------------------");
        console.log(" NovaStore Backend Started ");
        console.log(` Server running on port ${PORT}`);
        console.log("--------------------------------");

    });

};


startServer();
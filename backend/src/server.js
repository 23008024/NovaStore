const app = require("./app");
const { connectDatabase } = require("./config/database");
require("dotenv").config();


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
const app = require("../src/app");
const { connectDatabase } = require("../src/config/database");

require("../src/services/email.service");

let connected = false;

module.exports = async (req, res) => {
  if (!connected) {
    await connectDatabase();
    connected = true;
  }

  return app(req, res);
};

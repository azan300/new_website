const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  gmailConfigs: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI
  },
  serverPort: process.env.PORT || 5000,
}
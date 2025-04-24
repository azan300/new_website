const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  gmailConfigs: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI
  },
  serverPort: process.env.PORT || 4000,
  firebase:{
    apiKey: process.env.FIREBASE_API_KEY,
    appDomain: process.env.FIREBASE_APP_DOMAIN,
    appId: process.env.FIREBASE_APP_ID,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  }
}
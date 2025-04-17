const { google } = require("googleapis");
const { gmailConfigs } = require('../config')

const oauth2Client = new google.auth.OAuth2(gmailConfigs.GOOGLE_CLIENT_ID, gmailConfigs.GOOGLE_CLIENT_SECRET, gmailConfigs.GOOGLE_REDIRECT_URI);

module.exports = oauth2Client;

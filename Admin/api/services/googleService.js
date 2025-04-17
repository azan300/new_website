const { google } = require("googleapis");

const getGmailClient = (token) => {
  const oauth2Client = require("../utils/oauth2Client");
  oauth2Client.setCredentials(token);
  return google.gmail({ version: "v1", auth: oauth2Client });
};

module.exports = {
  getGmailClient
};

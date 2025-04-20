const { google } = require("googleapis");
const oauth2Client = require('../utils/oauth2Client');

const getChatClient = (token) => {
  oauth2Client.setCredentials(token);
  return google.chat({ version: "v1", auth: oauth2Client });
};

async function listSpaces(token) {
  console.log("listing spaces", token);
  const chat = await getChatClient(token);
  const res = await chat.spaces.list();
  return res.data.spaces || [];
}

async function listMessages(token, spaceId) {
  const chat = await getChatClient(token);
  const res = await chat.spaces.messages.list({
    parent: spaceId, pageSize: 500, // max allowed
  });
  return res.data.messages || [];
}

async function sendMessage(token, spaceId, messageText) {
  const chat = await getChatClient(token);

  const res = await chat.spaces.messages.create({
    parent: spaceId,
    requestBody: {
      text: messageText,
    },
  });

  return res.data;
}

module.exports = {
  listSpaces,
  listMessages,
  sendMessage,
};

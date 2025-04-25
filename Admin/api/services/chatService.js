const { google } = require("googleapis");
const oauth2Client = require('../utils/oauth2Client');

const people = google.people({ version: 'v1', auth: oauth2Client });

async function getUserInfo(personId) {
  try {
    const res = await people.people.get({
      resourceName: `people/${ personId }`, // Use the specific person ID
      personFields: 'names,emailAddresses', // Specify the fields you want
    });
    const profile = res.data;

    if (profile.names && profile.names.length > 0) {
      return profile.names[0].displayName
    }

    if (profile.emailAddresses && profile.emailAddresses.length > 0) {
      return profile.emailAddresses[0].value
    }
    else {
      console.log(`No email found for user ID: ${ personId }`);
    }
  }
  catch (err) {
    console.error(`Error retrieving user profile for ID ${ personId }:`, err);
  }
}

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

  const messages = res.data.messages || [];

  const enrichedMessages = await Promise.all(
    messages.map(async (msg) => {
      const senderIdRaw = msg.sender?.name || '';
      const senderId = senderIdRaw.split('/')[1];

      if(senderId === token?.id){
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
      }

      const userInfo = senderId === token?.id
        ? token?.name || senderIdRaw
        : await getUserInfo(senderId);

      return {
        ...msg,
        senderName: userInfo
      };
    })
  );

  return enrichedMessages;

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

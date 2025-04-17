const { getGmailClient } = require("../services/googleService");
const { extractPlainTextBody, extractAttachments } = require("../utils/gmail");
// Get list of emails (Inbox)
exports.getInbox = async (req, res) => {
  try {
    const gmail = getGmailClient(req.token);

    // Step 1: Get list of message IDs
    const listRes = await gmail.users.messages.list({
      userId: "me",
      labelIds: ["INBOX"],
      maxResults: 50,
    });

    const messageIds = listRes.data.messages || [];

    // Step 2: Fetch full metadata for each message
    const messages = await Promise.all(
      messageIds.map(async (msg) => {
        const msgRes = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
          format: "metadata", // or "full" if you need full content
          metadataHeaders: ["Subject", "From", "Date"],
        });

        const headers = msgRes.data.payload.headers.reduce((acc, h) => {
          acc[h.name] = h.value;
          return acc;
        }, {});

        return {
          id: msg.id,
          threadId: msg.threadId,
          snippet: msgRes.data.snippet,
          subject: headers.Subject || "(No Subject)",
          from: headers.From,
          date: headers.Date,
          hasAttachments: checkAttachments(msgRes.data.payload),
        };
      })
    );

    res.json(messages);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

function checkAttachments(payload) {
  if (!payload.parts) return false;
  return payload.parts.some(part => part.filename && part.filename.length > 0);
}

// Get email details
exports.getEmailDetails = async (req, res) => {
  try {
    const gmail = getGmailClient(req.token);
    const message = await gmail.users.messages.get({
      userId: "me",
      id: req.params.id,
    });

    res.json(message.data);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Compose/Send email
exports.sendEmail = async (req, res) => {
  const { to, subject, message } = req.body;
  const raw = Buffer.from(
    `To: ${ to }\r\nSubject: ${ subject }\r\n\r\n${ message }`
  ).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');

  try {
    const gmail = getGmailClient(req.token);
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: raw,
      },
    });

    res.json({ message: "Email sent successfully!" });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getThreadMessages = async (req, res) => {
  try {
    const gmail = getGmailClient(req.token);
    const { threadId } = req.params;

    // Step 1: Get the entire thread by threadId
    const threadRes = await gmail.users.threads.get({
      userId: "me",
      id: threadId,
      format: "full", // To get full message content
    });

    // Step 2: Map messages from thread
    const messages = threadRes.data.messages.map((msg) => {
      const headers = msg.payload.headers.reduce((acc, h) => {
        acc[h.name] = h.value;
        return acc;
      }, {});

      return {
        id: msg.id,
        threadId: msg.threadId,
        subject: headers.Subject || "(No Subject)",
        from: headers.From,
        to: headers.To,
        date: headers.Date,
        snippet: msg.snippet,
        body: extractPlainTextBody(msg.payload),
        attachments: extractAttachments(msg.payload),
      };
    });

    res.json(messages);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const { listSpaces, listMessages, sendMessage } = require("../services/chatService");

// Get list of spaces (Inbox)
exports.getSpaces = async (req, res) => {
  try {
    const spaces = await listSpaces(req.token);
    res.json(spaces);
  }
  catch (e) {
    res.status(500).json({ success: false, error: { message: "Failed to fetch spaces", reason: e.message } });
  }
}

exports.getMessages = async (req, res) => {
  try {
    const spaceId = req.query.spaceId;
    const messages = await listMessages(req.token, spaceId);
    res.json(messages);
  }
  catch (e) {
    console.log(e)
    res.status(500).send("Failed to fetch messages");
  }
}

exports.sendMessage = async (req, res) => {
  try {
    const { spaceId, text } = req.body;
    const result = await sendMessage(req.token, spaceId, text);
    res.json(result);
  }
  catch (e) {
    console.log(e)
    res.status(500).send("Failed to send message");
  }
}
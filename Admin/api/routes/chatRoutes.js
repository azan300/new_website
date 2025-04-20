const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/spaces", chatController.getSpaces);
router.get("/messages/:spaceId", chatController.getMessages);
router.post("/message", chatController.sendMessage);

module.exports = router;

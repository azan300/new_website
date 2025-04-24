const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const { validateIdentifier } = require("../middleware/token");

router.get("/spaces", validateIdentifier, chatController.getSpaces);
router.get("/messages", validateIdentifier, chatController.getMessages);
router.post("/message", validateIdentifier, chatController.sendMessage);

module.exports = router;

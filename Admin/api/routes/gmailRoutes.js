const express = require("express");
const router = express.Router();
const gmailController = require("../controllers/gmailController");

router.get("/emails", gmailController.getInbox);
router.get("/emails/:id", gmailController.getEmailDetails);
router.post("/emails", gmailController.sendEmail);
router.get("/emails/thread/:threadId", gmailController.getThreadMessages);


module.exports = router;

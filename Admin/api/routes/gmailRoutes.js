const express = require("express");
const router = express.Router();
const gmailController = require("../controllers/gmailController");
const { validateIdentifier } = require("../middleware/token");

router.get("/emails", validateIdentifier, gmailController.getInbox);
router.get("/emails/:id", validateIdentifier, gmailController.getEmailDetails);
router.post("/emails", validateIdentifier, gmailController.sendEmail);
router.get("/emails/thread/:threadId", validateIdentifier, gmailController.getThreadMessages);


module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyFirebaseToken = require("../middleware/firebase");

router.post("/save-token", verifyFirebaseToken, userController.saveToken);

module.exports = router;
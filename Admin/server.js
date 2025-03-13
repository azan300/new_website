import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ensure environment variables are set
if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
  console.error("❌ Missing environment variables: GMAIL_USER or GMAIL_PASS");
  process.exit(1); // Exit process if required environment variables are missing
}

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // Use App Password, not your actual password
  },
});

// Test the transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email Transporter Error:", error);
  } else {
    console.log("✅ Email Transporter is ready to send messages");
  }
});

// Email Sending API Endpoint
app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const mailOptions = {
    from: `"StraightUp Roofing" <${process.env.GMAIL_USER}>`, // Custom sender name
    to,
    subject,
    html: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent: ${info.messageId}`);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Email Sending Error:", error);
    res.status(500).json({ success: false, message: "Email sending failed", error: error.message });
  }
});

// Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`📨 Email API running on port ${PORT}`));

import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from `.env`
dotenv.config();

// Initialize Firebase
initializeApp();

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // Use App Passwords, NOT your real password
  },
});

// Cloud Function to Send Email
export const sendEmail = onRequest(async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("✅ Email sent successfully");
  } catch (error) {
    res.status(500).send(`❌ Error sending email: ${error.message}`);
  }
});

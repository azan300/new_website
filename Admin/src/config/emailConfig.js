import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,  // Your Gmail email (store in .env)
        pass: process.env.GMAIL_PASS   // Your Gmail App Password (store in .env)
    }
});

export default transporter;

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const {authenticate} = require('@google-cloud/local-auth');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json()); // to parse JSON request bodies

// Replace with your actual credentials
const CLIENT_ID = "602714767093-hulo8d18n3t9i9qa9fal0d4afl74iods.apps.googleusercontent.com";
const CLIENT_SECRET = "YGOCSPX-0QKnHbil4qG4uZf-pshQ0gppLUf8";
const REDIRECT_URI = "https://straightuproofing-79614.web.app/api/store-refresh-token"; // match Google Cloud Console

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

// === ROUTE 1: Exchange code for tokens ===
app.post("/store-refresh-token", async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Missing auth code" });

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    functions.logger.info("Tokens acquired:", tokens);

    res.status(200).json({ message: "Token exchange successful", tokens });
  } catch (err) {
    console.error("Error exchanging code:", err);
    res.status(500).json({ error: "Token exchange failed", details: err.message });
  }
});

// === ROUTE 2: Create a Google Calendar Event ===
app.post("/create-google-event", async (req, res) => {
  const { access_token, event } = req.body;
  if (!access_token || !event) {
    return res.status(400).json({ error: "Missing access_token or event data" });
  }

  const calendarAuth = new google.auth.OAuth2();
  calendarAuth.setCredentials({ access_token });
  const calendar = google.calendar({ version: "v3", auth: calendarAuth });

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: event.title,
        start: { dateTime: event.start },
        end: { dateTime: event.end },
      },
    });

    res.status(200).json({ message: "Event created", eventId: response.data.id });
  } catch (err) {
    console.error("Failed to create Google Calendar event:", err);
    res.status(500).json({ error: "Event creation failed", details: err.message });
  }
});

// === ROUTE 3: Get Google Emails (Gmail API) ===
app.post("/get-google-emails", async (req, res) => {
//  const authHeader = req.headers.authorization;
 // const access_token = /* authHeader ? authHeader.split(" ")[1]  :*/ req.body.access_token;
 const access_token = JSON.parse(req.body.access_token).currentUser.stsTokenManager.accessToken;

  if (!access_token) return res.status(400).json({ error: "Missing access token" });

  const gmailAuth = new google.auth.OAuth2();
  gmailAuth.setCredentials({ access_token });
 // gmailAuth.setCredentials(access_token);

  const gmail = google.gmail({ version: "v1", auth: gmailAuth });

  try {
    const response = await gmail.users.messages.list({ userId: "me", maxResults: 20 });
    const messages = response.data.messages || [];

    const emailData = await Promise.all(
      messages.map(async (msg) => {
        const fullMessage = await gmail.users.messages.get({ userId: "me", id: msg.id });
        console.log("got here", fullMessage);
        const payload = fullMessage.data.payload;
        const headers = payload.headers;

        const subject = headers.find(h => h.name === "Subject")?.value || "";
        const from = headers.find(h => h.name === "From")?.value || "";
        const snippet = fullMessage.data.snippet;
        const date = headers.find(h => h.name === "Date")?.value || "";
        
        

        return {
          id: msg.id,
          subject,
          sender: from,
          snippet,
          date
        };
      })
    );

    res.status(200).json({ emails: emailData });
  } catch (err) {
    console.error("Error fetching Gmail messages:", err);
    res.status(500).json({ error: "Failed to fetch Gmail messages", details: err.message });
  }
});

exports.api = functions.https.onRequest(app);

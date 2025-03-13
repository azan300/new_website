import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const auth = new google.auth.GoogleAuth({
  keyFile: "path-to-your-service-account.json", // Change this to your JSON key file
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });

export const createEvent = async (eventData) => {
  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: eventData,
    });
    return response.data;
  } catch (error) {
    console.error("Google Calendar API Error:", error);
    throw error;
  }
};

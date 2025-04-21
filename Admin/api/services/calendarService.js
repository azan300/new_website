const { google } = require("googleapis");
const oauth2Client = require('../utils/oauth2Client');
const { db } = require('../utils/firebase');

const getCalendarClient = (token) => {
  oauth2Client.setCredentials(token);
  return google.calendar({ version: "v3", auth: oauth2Client });
};

// Create Event
async function createEvent(token, eventData) {
  const calendar = await getCalendarClient(token);
  const res = await calendar.events.insert({
    calendarId: 'primary',
    resource: eventData,
  });
  return res.data;
}

// Get Events List
async function listEvents(token, timeMin, timeMax) {
  const calendar = await getCalendarClient(token);

  timeMin = new Date(timeMin).toISOString();
  timeMax = new Date(timeMax).toISOString();

  const res = await calendar.events.list({
    calendarId: 'primary',
    maxResults: 10,
    orderBy: 'startTime',
    singleEvents: true,
    timeMin,
    timeMax,
  });

  return res.data.items;
}

// Update Event
async function updateEvent(token, eventId, updatedData) {
  const calendar = await getCalendarClient(token);
  const res = await calendar.events.update({
    calendarId: 'primary',
    eventId,
    resource: updatedData,
  });
  return res.data;
}

// Delete Event
async function deleteEvent(token, eventId) {
  const calendar = await getCalendarClient(token);

  await calendar.events.delete({
    calendarId: 'primary',
    eventId,
  });
  return { success: true };
}

async function addTasksToFirestore(events, userId) {

  for (const event of events) {
    console.log(event)
    await db.collection('calendarEvents').add({
      summary: event.summary,
      description: event.description || '',
      start: event.start,
      end: event.end,
      eventId: event?.eventId || null, // google calendar tasks id
      userId: userId || null // user id for fetching based on id
    });
  }

  return events.length;
}

async function getEventsByDateRangeFirestore(startDate, endDate, userId) {
  const snapshot = await db.collection('calendarEvents')
    .where('userId', '==', userId)
    .where('start', '>=', startDate)
    .where('start', '<=', endDate)
    .get();

  const events = [];
  snapshot.forEach(doc => {
    events.push({ id: doc.id, ...doc.data() });
  });

  return events;
}

async function updateEventDocFirestore(eventId, updatedFields) {
  const ref = db.collection('calendarEvents').doc(eventId);
  await ref.update(updatedFields);
  return { success: true, id: eventId };
}

async function deleteEventFromFirestore(eventId) {
  const ref = db.collection('calendarEvents').doc(eventId);
  await ref.delete();
  return { success: true, id: eventId };
}

module.exports = {
  createEvent,
  listEvents,
  updateEvent,
  deleteEvent,
  addTasksToFirestore,
  getEventsByDateRangeFirestore,
  updateEventDocFirestore,
  deleteEventFromFirestore
};
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

async function getUnsyncedEvents(userId) {
  try {
    const snapshot = await db.collection('calendarEvents')
      .where('userId', '==', userId)
      .where('eventId', '==', null)
      .get();

    if (snapshot.empty) {
      console.log('No unsynced events found for user:', userId);
      return [];
    }

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  }
  catch (error) {
    console.error('Error fetching unsynced events:', error);
    throw new Error('Failed to retrieve unsynced events');
  }
}

// Create Event
async function syncEvent(token) {
  try {
    // Get all unsynced events
    const unsyncedEvents = await getUnsyncedEvents(token.id);

    if (unsyncedEvents.length === 0) {
      return { success: true, message: 'No events to sync' };
    }

    const calendar = await getCalendarClient(token);
    const batch = db.batch();
    const results = [];
console.log(unsyncedEvents)
    for (const event of unsyncedEvents) {
      try {
        const googleEvent = {
          summary: event.summary,
          description: event.description || '',
          start: { dateTime: event.start.dateTime, timeZone: 'UTC' },
          end: { dateTime: event.end.dateTime, timeZone: 'UTC' }
        };

        const res = await calendar.events.insert({
          calendarId: 'primary',
          resource: googleEvent
        });
        console.log(res, '**************')

        batch.update(db.collection('calendarEvents').doc(event.id), {
          eventId: res.data.id,
        });

        results.push({
          firestoreId: event.id,
          googleEventId: res.data.id,
          status: 'success'
        });
      }
      catch (error) {
        results.push({
          firestoreId: event.id,
          status: 'failed',
          error: error.message
        });
      }
    }

    await batch.commit();
    return {
      success: true,
      syncedCount: results.filter(r => r.status === 'success').length,
      failedCount: results.filter(r => r.status === 'failed').length,
      results
    };

  }
  catch (error) {
    console.error('Error in syncUnsyncedEvents:', error);
    throw error;
  }
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
    .get();

  const start = new Date(startDate);
  const end = new Date(endDate);

  const events = [];
  snapshot.forEach(doc => {
    const eventData = doc.data();
    const eventStart = new Date(eventData.start.dateTime);
    const eventEnd = new Date(eventData.end.dateTime);
    if (eventStart >= start && eventStart <= end) {
      events.push({
        id: doc.id,
        ...eventData,
        title: eventData.summary,
        start: eventStart,
        end: eventEnd,
      });
    }
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
  deleteEventFromFirestore,
  syncEvent
};
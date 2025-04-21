const {
  createEvent,
  listEvents,
  updateEvent,
  deleteEvent,
  addTasksToFirestore,
  getEventsByDateRangeFirestore,
  updateEventDocFirestore,
  deleteEventFromFirestore
} = require("../services/calendarService");
const events = require('node:events');

exports.getEvents = async (req, res) => {
  try {
    const startTime = req.query.startTime;
    const endTime = req.query.endTime;

    if (!endTime || !startTime) {
      return res.status(400).json({ success: false, error: { message: "Missing date fields" } });
    }
    const events = await listEvents(req.token, startTime, endTime);
    res.json(events);
  }
  catch (e) {
    console.log(e)
    res.status(500).json({ success: false, error: { message: "Failed to fetch events", reason: e.message } });
  }
}

exports.addEvent = async (req, res) => {
  try {
    const event = await createEvent(req.token, req.body);

    res.json(event);
  }
  catch (e) {
    console.log(e)
    res.status(500).json({ success: false, error: { message: "Failed to add event", reason: e.message } });
  }
}

exports.updateTask = async (req, res) => {
  try {
    const event = await updateEvent(req.token, req.params.id, req.body);
    res.json(event);
  }
  catch (e) {
    console.log(e)
    res.status(500).json({ success: false, error: { message: "Failed to update event", reason: e.message } });
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const result = await deleteEvent(req.token, req.params.id);
    res.json(result);
  }
  catch (e) {
    console.log(e)
    res.status(500).json({ success: false, error: { message: "Failed to delete event", reason: e.message } });
  }
}

exports.addTasksToFirestore = async (req, res) => {
  try {

    if (!Array.isArray(req?.body?.events) || !req.body.userId) {
      return res.status(400).json({ success: false, error: { message: "Missing Required Fields" } });
    }

    const event = await addTasksToFirestore(req.body?.events, req.body.userId);

    res.json({ success: true, message: "data added successfully", });
  }
  catch (e) {
    console.log(e)
    res.status(500).json({ success: false, error: { message: "Failed to add event", reason: e.message } });
  }
}

exports.fetchTasksFromFirestore = async (req, res) => {
  try {
    const { startTime, endTime, userId } = req.query;
    const events = await getEventsByDateRangeFirestore(startTime, endTime, userId);
    res.json(events);
  }
  catch (e) {
    console.log(e)
    res.status(500).json({ success: false, error: { message: "Failed to fetch events", reason: e.message } });
  }
}

exports.updateTasksInFirestore = async (req, res) => {
  try {
    const result = await updateEventDocFirestore(req.params.id, req.body);
    res.json(result);
  }
  catch (e) {
    console.log(e)
    res.status(500).json({ success: false, error: { message: "Failed to update event", reason: e.message } });
  }
}

exports.deleteTasksInFirestore = async (req, res) => {
  try {
    const result = await deleteEventFromFirestore(req.params.id);
    res.json(result);
  }
  catch (e) {
    console.log(e)
    res.status(500).json({ success: false, error: { message: "Failed to delete event", reason: e.message } });
  }
}


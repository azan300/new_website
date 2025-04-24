const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendarController");
const {validateIdentifier} = require("../middleware/token");

router.post('/event',validateIdentifier, calendarController.addEvent);

router.get('/events', calendarController.getEvents);

router.put('/events/:id', calendarController.updateTask);

router.delete('/events/:id', calendarController.deleteTask);

router.post('/firestore/events', calendarController.addTasksToFirestore);

router.get('/firestore/events', calendarController.fetchTasksFromFirestore);

router.put('/firestore/events/:id', calendarController.updateTasksInFirestore);

router.delete('/firestore/events/:id', calendarController.deleteTasksInFirestore);

module.exports = router;

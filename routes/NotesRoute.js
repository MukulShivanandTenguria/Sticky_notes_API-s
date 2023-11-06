const express = require('express');
const NotesController = require("../controllers/NotesController")
const authController = require("../controllers/authController")
const router = express.Router()

router
.route("/email")
.get(NotesController.sendEmail)

router
.route("/create-note")
.post(NotesController.createNote)
router
.route("/all-notes")
.get(authController.protect,NotesController.getAllNotes)

router
.route("/:name")
.get(authController.protect,NotesController.getNotesOFaUser)


router
.route("/:name/:id")
.get(authController.protect,NotesController.getNoteById)
.delete(authController.protect,NotesController.deleteNote)
.patch(authController.protect,NotesController.updateNote)
module.exports = router
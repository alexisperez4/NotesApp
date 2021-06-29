const { Router } = require('express');
const notesCtrl = require('../controllers/notes.controllers');
const router = Router();

const {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
} = require('../controllers/notes.controllers');

// Nueva nota
router.get('/notes/add', renderNoteForm)
router.post('/notes/new-note', createNewNote)

//Obtener todas notas
router.get('/notes', renderNotes)

// Editar notas
router.get('/notes/edit/:id', renderEditForm)
router.put('/notes/edit/:id', updateNote)

//Eliminar notas
router.delete('/notes/delete/:id', deleteNote)



module.exports = router;
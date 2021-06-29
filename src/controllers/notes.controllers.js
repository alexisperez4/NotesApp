const notesCtrl = {};
const db = require('../database/database');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('./notes/new-note');
}

notesCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body;
    const x = await db.query('INSERT INTO nota (titulo, descripcion) VALUES ($1, $2) RETURNING *', [title, description])
    res.redirect('/notes')
}

notesCtrl.renderNotes = async (req, res) => {
    const allNotes = await (await db.query('SELECT * FROM nota'))
    const obj = {
        allNotes: allNotes.rows
    }
    //res.send(obj)
    res.render('notes/all-notes', obj);
}

notesCtrl.renderEditForm = (req, res) => {
    res.send('renderEditForm');
}

notesCtrl.updateNote = (req,  res) => {
    res.send('updateNote');
}

notesCtrl.deleteNote = async (req, res) => {
    const id = req.params.id
    await db.query('DELETE FROM nota WHERE id = ($1)', [id])
    res.redirect('/notes')
}

module.exports = notesCtrl;
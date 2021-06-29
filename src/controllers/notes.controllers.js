const notesCtrl = {};
const db = require('../database/database');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('./notes/new-note');
}

notesCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body;
    const x = await db.query('INSERT INTO nota (titulo, descripcion) VALUES ($1, $2) RETURNING *', [title, description])
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/notes')
}

notesCtrl.renderNotes = async (req, res) => {
    const allNotes = await (await db.query('SELECT * FROM nota ORDER BY ID'))
    const obj = {
        allNotes: allNotes.rows
    }
    //res.send(obj)
    res.render('notes/all-notes', obj);
}

notesCtrl.renderEditForm = async (req, res) => {
    const id = req.params.id;
    const nota = await db.query('SELECT * FROM nota WHERE id = ($1)', [id])
    const obj = { nota: nota.rows[0] }
    res.render('notes/edit-note', obj);
}

notesCtrl.updateNote = async (req,  res) => {
    const id = req.params.id;
    const { title , description } = req.body;
    await db.query('UPDATE nota SET titulo=($1), descripcion=($2)  WHERE id = ($3) ',
        [ title , description , id ]);
    req.flash('success_msg', 'Note Updated Successfully')
    res.redirect('/notes');
}

notesCtrl.deleteNote = async (req, res) => {
    const id = req.params.id
    await db.query('DELETE FROM nota WHERE id = ($1)', [id])
    req.flash('success_msg', 'Note Deleted Successfully')
    res.redirect('/notes')
}

module.exports = notesCtrl;
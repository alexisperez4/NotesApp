const notesCtrl = {};
const db = require('../database/database');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('./notes/new-note');
}

notesCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body;
    const user = req.user;
    const x = await db.query('INSERT INTO nota (titulo, descripcion, id_user) VALUES ($1, $2, $3) RETURNING *', [title, description, user.id])
    req.flash('success_msg', 'Nota agregada con suceso');
    res.redirect('/notes')
}

notesCtrl.renderNotes = async (req, res) => {
    const user = req.user;
    const allNotes = await db.query('SELECT * FROM nota WHERE id_user = $1 ORDER BY ID', [user.id]);
    const obj = {
        allNotes: allNotes.rows
    }
    //res.send(obj)
    res.render('notes/all-notes', obj);
}

notesCtrl.renderEditForm = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const nota = await db.query('SELECT * FROM nota WHERE id = ($1)', [id])
    if(nota.rows[0].id_user != user.id){
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/notes');
    }    
    const obj = { nota: nota.rows[0] }
    res.render('notes/edit-note', obj);
}

notesCtrl.updateNote = async (req,  res) => {
    const id = req.params.id;
    const { title , description } = req.body;
    await db.query('UPDATE nota SET titulo=($1), descripcion=($2)  WHERE id = ($3) ',
        [ title , description , id ]);
    req.flash('success_msg', 'Nota actualizada con suceso')
    res.redirect('/notes');
}

notesCtrl.deleteNote = async (req, res) => {
    const id = req.params.id
    await db.query('DELETE FROM nota WHERE id = ($1)', [id])
    req.flash('success_msg', 'Nota eliminada con suceso')
    res.redirect('/notes')
}

module.exports = notesCtrl;
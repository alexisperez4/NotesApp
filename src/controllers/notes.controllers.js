const notesCtrl = {};

notesCtrl.renderNoteForm = (req, res) => {
    res.render('./notes/new-note');
}

notesCtrl.createNewNote = (req, res) => {
    console.log(req.body)
    res.send('create new note')
}

notesCtrl.renderNotes = (req, res) => {
    res.send('render note');
}

notesCtrl.renderEditForm = (req, res) => {
    res.send('renderEditForm');
}

notesCtrl.updateNote = (req,  res) => {
    res.send('updateNote');
}

notesCtrl.deleteNote = (req, res) => {
    res.send('deleteNote')
}

module.exports = notesCtrl;
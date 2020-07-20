const note_router = require('express').Router();
const Note = require('../models/note');

note_router.get('/' , async (req, res) => {
    const notes = await Note.find({});
    res.json(notes);
});

note_router.get('/:id', async (req, res, next) => {
    try{
    const id = req.params.id;
    const note = await Note.findById(id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }

    } catch(err){
        next(err)
    }
});

note_router.post('/', (req, res, next) => {
    const body = req.body;

    const note = new Note({
        content: body.content,
        important: body.important,
        date: body.date
    });

    note.save()
        .then((saved_note) => {
            res.json(saved_note)
        })
        .catch((err) => {
            next(err);
        })
});

note_router.put('/:id', (req, res, next) => {
    const body = req.body;
    const id = req.params.id;

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(id, note, { new: true })
        .then((updated_note) => {
            res.json(updated_note)
        })
        .catch((err) => {
            next(err);
        })
});

note_router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    Note.findByIdAndDelete(id)
        .then(() => {
            return res.status(204).end();
        })
        .catch((err) => {
            next(err);
        })
});

module.exports = note_router;
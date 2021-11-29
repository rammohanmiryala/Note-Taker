const notes = require('express').Router();
const {
    v4: uuidv4
} = require('uuid');
const {
    readAndAppend,
    readFromFile,
    writeToFile
} = require('../helpers/fsUtils');

// requesting the existing notes
notes.get('/', (req, res) => {
    readFromFile('../db/db.json')
        .then((data) => res.json(JSON.parse(data)));
});


// POST notes
notes.post('/', (req, res) => {
    if (req.body) {
        const createnote = {
            title: req.body.title,
            text: req.body.text,
            notes_id: uuidv4(),
        }

        readAndAppend(createnote, '../db/db.json');
        res.json("your note is added")


    } else {
        res.json(" error in adding notes to page")

    }

});


// DELETE Route for a specific note
notes.delete('/:notes_id', (req, res) => {
    const notesId = req.params.notes_id;
    readFromFile('../db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all tips except the one with the ID provided in the URL
            const result = json.filter((notes) => notes.notes_id !== notesId);

            // Save that array to the filesystem
            writeToFile('../db/db.json', result);

            // Respond to the DELETE request
            res.json(`note ${notesId} has been deleted 🗑️`);
        });
});

module.exports = notes;
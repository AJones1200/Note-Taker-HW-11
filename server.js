const express = require('express');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const path = require('path');
const uuid = require('./uuid')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('/api/notes', async (req, res) => {
    var notes = await readFileAsync('./db/db.json', 'utf8')
    notes = JSON.parse(notes)
    res.json(notes)
})

app.delete('/api/notes/:id', async (req, res) => {
    var notes = await readFileAsync('./db/db.json', 'utf8')
    notes = JSON.parse(notes)
    var newNoteArray = notes.filter(note => {
        if(note.id !== req.params.id) {
            return note
        }
    })
    const noteString = JSON.stringify(newNoteArray);
    await writeFileAsync(`./db/db.json`, noteString) 
    res.json({ok:true})
})


app.post('/api/notes', async (req, res) => {
    console.info(`${req.method} post request recieved to add note`
    )
    const {title, text} = req.body
    if (title && text) {
        var notes = await readFileAsync('./db/db.json', 'utf8')
        notes = JSON.parse(notes)
        console.log(notes)
        const newNote = {
            title, 
            text, 
            id: uuid(),
        }
        notes.push(newNote)

        console.log(notes)
        const noteString = JSON.stringify(notes);
        fs.writeFile(`./db/db.json`, noteString, (err) => 
        err ? console.log('err') : console.log(`note for ${newNote.title} has been written to JSON file.`));
    const response = {
        status:'success', 
        body: newNote,
    }
    res.status(201).json(response)
}
else {res.status(500).json(`Error in posting note.`)}
})

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);
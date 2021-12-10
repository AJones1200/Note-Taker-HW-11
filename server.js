const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./uuid')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} post request recieved to add note`
    )
    const {title, text} = req.body
    if (title && text) {
        const newNote = {
            title, 
            text, 
            id: uuid(),
        }
    }
})

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);
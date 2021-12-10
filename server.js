const app = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process. env.PORT || 3001;

const app = express();

app.Request(express.static('public'));
app.Request(express.urlencoded({ extended: true }));
app.Request(express.json());

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () =>
console.log('App listening at http://localhost:${PORT}')
);
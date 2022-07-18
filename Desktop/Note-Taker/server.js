const fs = require('fs');
const path = require('path');
const express = require("express");
// importin utilities modules
const util = require('util');
//require('util.promisify').shim();
const readFromFile = util.promisify(fs.readFile);
const uniqid = require('uniqid');

//initialize express.js server
const app = express();
// assign to port 3001
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// fs writeFile function
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
);
// // handling Asynchronous Processes
// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);

// simplified fs appendFile function
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

//route to notes
app.get('/notes.html', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// api to get notes
app.get("/api/notes", (req, res) => {
  readFromFile('./db/db.json').then((data) => {
    res.json(JSON.parse(data))
  });
});
// //api route/POST request
 app.post('/api/notes', (req,res) => {
  const {title, text} = req.body;
  if(req.body) {
    const newNote = {
      id: uniqid(),
      title,
      text,

    };
    readAndAppend(newNote, './db/db.json');
    res.json('success');
  }else {
    res.error('please try again')
  }
});


// API to delete notes using id
app.delete("/api/notes/:id", (req, res) => {
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== req.params.id);
      writeToFile('./db/db.json', result);
      res.json(`Item ${req.params.title} DELETED`);
    });
})

// route to html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});




app.listen(PORT, () => {
  console.log(`API server now on http://localhost:${PORT}`);
});

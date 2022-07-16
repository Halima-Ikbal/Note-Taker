const fs = require('fs');
const path = require('path')
const express = require("express");


//initialize express.js server
const app = express();
// assign port 3001
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// fs writeFile function
const writeFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
  err ? console.error(err) : console.info (`\nData written to ${destination}`)
  );

//route to/ notes
app.get('/notes.html', (req, res) =>
res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);

// api to get notes
app.get('/api/notes', (req, res) => {
  res.send('Hello NoteTakers!');
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}. ACTIVE!`);
});
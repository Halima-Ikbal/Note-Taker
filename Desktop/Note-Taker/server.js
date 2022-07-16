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




app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}. ACTIVE!`);
});
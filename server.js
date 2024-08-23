"use strict";
require("dotenv").config();
const app = require("./app");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const myDB = require("./connection");

fccTesting(app); //For FCC testing purposes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

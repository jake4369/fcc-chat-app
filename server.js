"use strict";
require("dotenv").config();
const app = require("./app");
const myDB = require("./connection");

const session = require("express-session");
const passport = require("passport");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const myDB = require("./connection");
const session = require("express-session");
const passport = require("passport");
const { ObjectID } = require("mongodb");

fccTesting(app); //For FCC testing purposes
app.set("view engine", "pug");
app.set("views", "./views/pug");
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

myDB(async (client) => {
  const myDataBase = await client.db("database").collection("users");
  console.log("Successfully connected to the database");

  app.route("/").get((req, res) => {
    res.render("index", {
      title: "Connected to Database",
      message: "Please login",
    });
  });

  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
      done(null, doc);
    });
  });

  app.route("/").get((req, res) => {
    res.render("index", { title: "Hello", message: "Please log in" });
  });
}).catch((e) => {
  app.route("/").get((req, res) => {
    res.render("index", {
      title: e,
      message: "Unable to connect to database",
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

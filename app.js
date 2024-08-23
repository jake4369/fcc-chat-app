const express = require("express");
const app = express();
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const session = require("express-session");
const passport = require("passport");

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

fccTesting(app); //For FCC testing purposes

app.route("/").get((req, res) => {
  res.render("index", { title: "Hello", message: "Please log in" });
});

module.exports = app;

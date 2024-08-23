const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");

app.set("view engine", "pug");
app.set("views", "./views/pug");
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/").get((req, res) => {
  res.render("index", { title: "Hello", message: "Please log in" });
});

module.exports = app;

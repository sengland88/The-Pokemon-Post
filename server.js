const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");

var db = require("./models");

var PORT = 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

mongoose.connect("mongodb://localhost/pokemonpost", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

module.exports = app;

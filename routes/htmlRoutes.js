var db = require("../models");
const path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("home");
  });
  
};
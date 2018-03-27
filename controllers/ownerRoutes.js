var db = require("../models");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

module.exports = function(app) {
  app.get("/api/owners", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Owner.findAll({}).then(function(dbResult) {
      var owners = [];

      dbResult.map(function(owner) {
        owners.push(owner.dataValues);
      });

      // We have access to the burgers as an argument inside of the callback function
      res.json({ owners: owners });
    });
  });

  // get a user by name
  // primary purpose is to check for existing user in the CreateAccount modal
  app.get("/api/owners/:name", function(req, res) {
    // findOne returns a single instance
    db.Owner.findOne({
      where: {
        userName: req.params.name
      }
    }).then(function(dbResult) {
      res.json(dbResult);
    });
  });

  // get a user by name and login the user
  app.get("/api/owners/login/:name", function(req, res) {
    // findOne returns a single instance
    db.Owner.findOne({
      where: {
        userName: req.params.name
      }
    }).then(function(dbResult) {
      // set the OwnerId into localStorage
      localStorage.setItem("OwnerId", dbResult.id);
      // TODO other stuff for login???
      res.json(dbResult);
    });
  });

  // POST route for saving a new owner. We can create a athlete using the data on req.body
  app.post("/api/owners/new", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Owner.create({
      userName: req.body.userName,
      teamName: req.body.teamName,
      passWord: req.body.passWord
    }).then(function(dbResult) {
      // We have access to the new owner as an argument inside of the callback function
      res.json(dbResult);
    });
  });
}

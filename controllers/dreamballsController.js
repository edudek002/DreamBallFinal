// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
var db = require("../models");

                 
// Dependencies
// =============================================================

// grab the orm from the config
// (remember: connection.js -> orm.js -> route file)
//va// *********************************************************************************


// Routes
// =============================================================
module.exports = function(app) {

  /*app.get("/", function(req, res) {
  // findAll returns all entries for a table when used with no options
  db.Athlete.findAll({}).then(function(dbResult) {
    var athletes = [];

    dbResult.map(function(athlete) {
      athletes.push(athlete.dataValues);
    });
    console.log(athletes)

    // We have access to the burgers as an argument inside of the callback function
    res.render('index', athletes);
  });  

});   */ 

  // GET route for getting all of the todos
  /*app.get("/api/athletes", function(req, res) {

    // findAll returns all entries for a table when used with no options
    db.Athlete.findAll({}).then(function(dbResult) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbResult);
    });

    
  });*/

  /*// POST route for saving a new todo. We can create a todo using the data on req.body
  app.post("/api/athletes", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Athlete.create({
      athleteName: req.body.athleteName,
      OwnerId: req.body.ownerID
    }).then(function(dbResult) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbResult);
    });   
  });*/

  

  // DELETE route for deleting todos. We can access the ID of the todo to delete in
  // req.params.id
  /*app.delete("/api/athletes/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Athlete.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbResult) {
      res.json(dbResult);
    });

    
  });*/

  // PUT route for updating todos. We can access the updated todo in req.body
  

  // PUT route for updating todos. We can access the updated todo in req.body
  app.put("/api/athletes", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Athlete.update({
      // athleteName: req.body.charName,
      OwnerId: req.body.OwnerId
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbDreamBall) {
      res.json(dbDreamBall);
    });
  });

    

};








//    STUFF FOR OTHER TABLES
//========================================
                
  /*// default athletes route is to render all in the database
  app.get("/api/athletes/team/:OwnerId", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Athlete.findAll({
      attributes: ['id', 'athleteName', 'homePlanet', 'powerPoints', 'isActive', 'athleteInjured', 'OwnerId'],
      where: {
        OwnerId: req.params.OwnerId
      },
      // Can only 'join' one table at a time.  We should already know the Owner, so skip it.
      // include: [{
      //   model: db.Owner,
      //   attributes: ['userName', 'teamName']
      // }],
      include: [{
        model: db.SpecialSkill,
        attributes: ['skillName']
      }]
    }).then(function(dbResult) {
      // console.log('find team result:', dbResult);
      var athletes = [];

      dbResult.map(function(athlete) {
        athletes.push(athlete.dataValues);
      });

      // We have access to the athletes as an argument inside of the callback function
      res.json({ athletes: athletes });
    });
  });
                
  // // POST route for saving a new athlete. We can create a athlete using the data on req.body
  // app.post("/api/athletes", function(req, res) {
  //   console.log(req.body);
  //     // create takes an argument of an object describing the item we want to
  //     // insert into our table. In this case we just we pass in an object with a text
  //     // and complete property (req.body)
  //     db.Athlete.create({
  //       athleteName: req.body.athleteName,
  //       ownerID: req.body.ownerID
  //     }).then(function(dbResult) {
  //       // We have access to the new athlete as an argument inside of the callback function
  //       res.json(dbResult);
  //     });
  // });

  // PUT route for updating athletess. We can access the updated athlete in req.body
  app.put("/api/athletes/owner/:id", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    // console.log(req.body);
    db.Athlete.update({
      // athleteName: req.body.athleteName,
      OwnerId: req.body.OwnerId
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbResult) {
      console.log(dbResult);
      res.json(dbResult);
    });
  });

  // PUT route for updating athletess. We can access the updated athlete in req.body
  app.put("/api/athletes/active/:id", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
      // we use where to describe which objects we want to update
    console.log(req.body);
    db.Athlete.update({
      // athleteName: req.body.athleteName,
      isActive: req.body.isActive
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbResult) {
      console.log(dbResult);
      res.json(dbResult);
    });
  });

  // PUT route for updating athletess. We can access the updated athlete in req.body
  app.put("/api/athletes/injured/:id", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
      // we use where to describe which objects we want to update
    console.log(req.body);
    db.Athlete.update({
      // athleteName: req.body.athleteName,
      athleteInjured: req.body.injuryTime
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbResult) {
      console.log(dbResult);
      res.json(dbResult);
    });
  });

  // // DELETE route for deleting athletes. We can access the ID of the athlete to delete in
  // // req.params.id
  // app.delete("/api/athletes/:id", function(req, res) {
  //   db.Athlete.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbResult) {
  //     res.json(dbResult);
  //   });
  // });

*/
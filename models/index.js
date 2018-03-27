'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

// // npm sequelize-heroku connetion method
// var sequelize = require('../models/index').Sequelize.connect();
// //var sequelize = require('../index').connect();

// if (sequelize)
// {
//     sequelize.authenticate().then( function() {
//         var config = sequelize.connectionManager.config;
//         console.log('sequelize-heroku: Connected to '+config.host+' as '+config.username+'.');
        
//         sequelize.query('SELECT 1+1 as test').then( function(res) {
            
//             console.log('1+1='+res[0].test);
            
//         });
        
//     }).catch( function(err) {
//         var config = sequelize.connectionManager.config;
//         console.log('Sequelize: Error connecting '+config.host+' as '+config.user+': '+err);
//     });
// }
// else
// {
//     console.log('No environnement variable found.');
// }

if (process.env.CLEARDB_DATABASE_URL) {
  var sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

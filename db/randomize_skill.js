//
// randomize_skills.js
//
// This script exists solely to randomize the special skill for each athlete beeded into the database.
// It is NOT part of the run-time app.
//

var fs = require('fs');
var LineByLineReader = require('line-by-line');

// cheat and manually enter the skills array, since it's so small
// do more cheating and manuall add up the weights into totals to compare vs the random number
var skills = [
{
  name: 'None',
  weight: 7,
  comparison: 7
},
{
  name: 'Bruiser',
  weight: 2,
  comparison: 9
},
{
  name: 'Blocker',
  weight: 1,
  comparison: 10
}
];

// cheat and manually calculate total weight
var total_weight = 10; // 7 + 2 + 1

//
// Synchronous reading of the seeds.sql file
// The .on() functions automatically begin processing when the script is invoked
//
var lr = new LineByLineReader('seedAthletes.sql', { encoding: 'ascii', skipEmptyLines: true });
var words = [];
// 'err' contains error object
lr.on('error', function (err)
{
  console.log('Error reading seeds.sql file:', err);
});

// 'line' contains the current line without the trailing newline character.
lr.on('line', function (line)
{
  // ok, do the random magic
  var rnd = Math.floor(Math.random() * total_weight);
  var skill = 0;

  // further cheat by manually making an if-then-else block of skills
  if (rnd < 7)
  {
    skill = 1;
  } else if (rnd < 9)
  {
    skill = 2;
  } else
  {
    skill = 3;
  }

  var athlete = line.split(',');
  var power = parseInt(athlete[2]);
  var cost = power + ((skill>1) ? 8 : 0);

  var output = [athlete[0], athlete[1], power, skill, cost].join(',');
  fs.appendFile('seedAthletes.txt', output + ",'2018-01-01 00:00:00','2018-01-01 00:00:00'),\n", function (err)
  {
    if (err) throw err;
  });
});

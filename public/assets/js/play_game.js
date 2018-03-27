// for testing, hard code OwnerId
var OwnerId = 15;

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function()
{
  $(document).on("click", "button.owner", function()
  {
    console.log("Selected Athlete:", this.id);
  });

  // Getting a reference to the input field where user adds a new Athlete
  var $newItemInput = $("input.new-item");
  // Our new Athletes will go inside the dreamballContainer
  var $dreamballContainer1 = $(".athlete-container1");
  var $dreamballContainer2 = $(".athlete-container2");
  //var $dreamballContainer3 = $(".athlete-container3");
  //var $dreamballContainer4 = $(".athlete-container4");

  console.log("Battle, OwnerId:", OwnerId);

  // Getting Athletes from database when page loads
  var OwnerTeam = getOwnerAthletes();
  // Getting Athletes from database when page loads
  // var AITeam = getAIAthletes();
  var AITeam = [];

  // play the game
  // playGame();

  //
  // Define Battle Functions
  //

  function translateSkillIcon(skillName)
  {
    skillIcon = "";
    switch (skillName) {
      case "Bruiser":
      case "2":
      case 2:
        // include the ' | ' in the icon to simplify the code later
        // skillIcon = ' | <i class="fab fa-grunt"></i>'; // Buttons do not allow HTML inside their Text
        skillIcon = ' | Bruiser';
        break;
      case "Blocker":
      case "3":
      case 3:
        // skillIcon = ' | <i class="fas fa-shield-alt"></i>';
        skillIcon = ' | Blocker';
        break;
    }
    return skillIcon;
  }

  function getOwnerAthletes()
  {
    var team = [];
    $.get("/api/athletes/team/active/"+OwnerId, function(data) {
      console.log("Owner Team:", data);
      team = data;
      for (var i = 0; i < team.length; ++i) {
        var skillIcon = translateSkillIcon(team[i].SpecialSkillId);
        // set the text for the DOM elements of the active athletes
        // var athleteText = team[i].athleteName+' | <i class="fas fa-bolt"></i>:'
        var athleteText = team[i].athleteName+' | '
                         +team[i].powerPoints+skillIcon;
        console.log("Athlete", i, athleteText);
        // $('#b_owner_athlete0'+i).html('<p>'+athleteText+'</p>');
        $('#b_owner_athlete'+i).text(athleteText);
      }
OwnerTeam = team;
AITeam = getAIAthletes();
    });
    return team;
  }

  function getAIAthletes()
  {
    var team = [];
    $.get("/api/athletes/team/active/2", function(data) {
      console.log("AI Team:", data);
      team = data;
      for (var i = 0; i < team.length; ++i) {
        var skillIcon = translateSkillIcon(team[i].SpecialSkillId);
        // set the text for the DOM elements of the active athletes
        // var athleteText = team[i].athleteName+' | <i class="fas fa-bolt"></i>:'
        var athleteText = team[i].athleteName+' | '
                         +team[i].powerPoints+skillIcon;
        team[i].athleteText = athleteText;
        console.log("Athlete", i, athleteText);
        // team[i].used = false;
$('#b_other_athlete'+i).text(athleteText);
      }
AITeam = team;
playGame();
    });
    return team;
  }

  function playGame()
  {
    var t1_score = 0;
    var t2_score = 0;
    // make sure AITeam starts unused
    for (var i = 0; i < 6; ++i) { AITeam[i].used = false; }
    console.log("playGame:OwnerTeam:", OwnerTeam);
    console.log("playGame:AITeam:", AITeam);
    // now play the game
    for (var i = 0; i < 6; ++i)
    {
      var t2 = AITeam.filter(p => !p.used);
      var rnd = Math.floor(Math.random() * t2.length);
      var t1_player = OwnerTeam[i];
      var t2_player = t2[rnd];
      var t2_index = AITeam.findIndex(p => p.name === t2_player.name);
      AITeam[t2_index].used = true;

      if (t1_player.skill === 2 || t2_player.skill === 2)
      {
        // if blocker
        if (t1_player.skill === 2 && t2_player.skill === 2)
        {
          if (t1_player.power > t2_player.power)
          {
            t1_score++;
            console.log("T1 Goal!", t1_player.name)
          }
          else if (t2_player.power > t1_player.power)
          {
            t2_score++;
            console.log("T2 Goal!", t2_player.name)
          }
        }
      } else {
        // else no blocker
        if (t1_player.power > t2_player.power)
        {
          t1_score++;
          console.log("T1 Goal!", t1_player.name)
        }
        else if (t2_player.power > t1_player.power)
        {
          t2_score++;
          console.log("T2 Goal!", t2_player.name)
        }
      }
      if (t1_player.skill === 1)
        console.log(t2_player.name, "was bruised.");
      if (t2_player.skill === 1)
        console.log(t1_player.name, "was bruised.");
    }

    console.log("Score:  Team One [", t1_score, "], Team Two [", t2_score, "]");
  }
});

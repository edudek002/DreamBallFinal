module.exports = function(sequelize, DataTypes) {

  var SpecialSkill = sequelize.define("SpecialSkill", {
    skillName: {
      type: DataTypes.STRING,
      //allowNull: false
    },
    skillWeight: {
      type: DataTypes.INTEGER,
      //allowNull: false
    }
  }, {
    // timestamps: false
  });

  SpecialSkill.associate = function(models) {
    SpecialSkill.hasMany(models.Athlete, {});
  };

  // Export the database functions for the controller.
  return SpecialSkill;
};

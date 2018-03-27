module.exports = function(sequelize, DataTypes) {

  var Athlete  = sequelize.define("Athlete", {
    athleteName: {
      type: DataTypes.STRING,
      //allowNull: false
    },
    homePlanet: {
      type: DataTypes.STRING,
      defaultValue: "Earth"
      //allowNull: false
    },
    powerPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 1
      //allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
      //allowNull: false
    },
    athleteCost: {
      type: DataTypes.INTEGER,
      defaultValue: 1
      //allowNull: false
    },
    // games injured
    athleteInjured: {
      type: DataTypes.INTEGER,
      defaultValue: 0
      //allowNull: false
    },
  }, {
    // timestamps: false
  });

  Athlete.associate = function(models) {
    Athlete.belongsTo(models.Owner, {
      foreignKey: {
        allowNull: false,
        defaultValue: 1
      }
    });
    Athlete.belongsTo(models.SpecialSkill, {
      foreignKey: {
        allowNull: false,
        defaultValue: 1
      }
    });
  };

  // Export the database functions for the controller.
  return Athlete;
};

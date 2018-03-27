module.exports = function(sequelize, DataTypes) {

  var  Owner = sequelize.define("Owner", {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true
    // },
    userName: {
      type: DataTypes.STRING,
      //allowNull: false
    },
    passWord: {
      type: DataTypes.STRING(10),
      //allowNull: false,

      validate: {
        len:{
          args: [1, 10],
          msg: "Your password is too long. Please keep it under 10 characters."
        }
      }
    },
    teamName: {
      type: DataTypes.STRING,
      defaultValue: ""
      //allowNull: false
    },
    teamSlogan: {
      type: DataTypes.STRING,
      defaultValue: ""
      //allowNull: false
    },
    teamFunds: {
      type: DataTypes.INTEGER,
      defaultValue: 50
    }
  }, {
    // timestamps: false
  });

  Owner.associate = function(models) {
    Owner.hasMany(models.Athlete, {});
  };

  // Export the database functions for the controller.
  return Owner;
};

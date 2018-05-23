module.exports = function (sequelize, Sequelize) {
  var Pie = sequelize.define("Pie", {
      id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      pie_name: {
          type: Sequelize.STRING,
          notEmpty: true
      },
      description: {
          type: Sequelize.STRING,
          allowNull: true
      },
      stock: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
      }
  });

  return Pie
};


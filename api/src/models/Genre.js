const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('genre', {
      id : {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      
  
    }, {timestamps : false}
    );
  };
  
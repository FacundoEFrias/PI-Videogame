const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type:DataTypes.TEXT,
      allowNull: false
    },
    released:{
      type: DataTypes.DATEONLY
    },
    rating:{
      type: DataTypes.DECIMAL

    },
    image:{
      type: DataTypes.STRING
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull: false
    }
   
  },
  {
    timestamps: false, 
  }
  );
};

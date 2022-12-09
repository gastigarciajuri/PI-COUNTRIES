const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('activity', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    dificult: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    lasting: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    season: {
        type: DataTypes.ENUM("Verano", "Otoño", "Primavera", "Invierno"),
        allowNull: false,
    },
    },{timestamps:false});
};
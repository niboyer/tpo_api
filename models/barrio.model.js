module.exports = (sequelize, Sequelize) => {
    const Barrio = sequelize.define("barrios", {
      idBarrio: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      }      
    }, {
      id: false,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,

      // If don't want createdAt
      createdAt: false,

      // If don't want updatedAt
      updatedAt: false,
    });
  
    return Barrio;
  };
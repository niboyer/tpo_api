module.exports = (sequelize, Sequelize) => {
    const Reclamo = sequelize.define("reclamos", {
      idReclamo: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      direccion1: {
        type: Sequelize.STRING
      }  ,
      direccion2: {
        type: Sequelize.STRING
      }  ,
      tipo: {
        type: Sequelize.STRING
      }  ,
      descripcion: {
        type: Sequelize.STRING
      }     ,
      urlImagenes: {
        type: Sequelize.STRING
      }  ,
      usuario: {
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

      freezeTableName: true,
    });
  
    return Reclamo;
  };
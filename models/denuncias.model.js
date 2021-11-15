module.exports = (sequelize, Sequelize) => {
    const Denuncia = sequelize.define("denuncias", {
      idDenuncia: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      }  ,
      direccion1: {
        type: Sequelize.STRING
      }  ,
      direccion2: {
        type: Sequelize.STRING
      }  ,
      motivo: {
        type: Sequelize.STRING
      }  ,
      descripcion: {
        type: Sequelize.STRING
      },
      urlImagenes: {
        type: Sequelize.STRING
      }  ,
      estado: {
        type: Sequelize.STRING
      },
      denunciante: {
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
  
    return Denuncia;
  };
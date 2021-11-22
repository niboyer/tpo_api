const { denuncias } = require(".");

module.exports = (sequelize, Sequelize) => {
    const DenunciaExtendida = sequelize.define("denunciasExtendidas", {
      idDenunciasExtendidas: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      descripcionDenunciado: {
        type: Sequelize.STRING
      }, 
      urlImagenes: {
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
    
    return DenunciaExtendida;
  };


module.exports = (sequelize, Sequelize) => {
    const Denuncia = sequelize.define("denuncias", {
      idDenuncias: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      documento:{
        type: Sequelize.STRING
      },
      idSitio: {
        type: Sequelize.INTEGER
      }, 
      descripcion: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      aceptaResponsabilidad: {
        type: Sequelize.INTEGER
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
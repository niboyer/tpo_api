module.exports = (sequelize, Sequelize) => {
    const Sitios = sequelize.define("sitios", {
      idSitio: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      latitud: {
          type: Sequelize.DECIMAL(9,5)
      },
      longitud: {
        type: Sequelize.DECIMAL(9,5)
      },
      calle: {
        type: Sequelize.STRING
      }  ,
      numero: {
        type: Sequelize.INTEGER
      }  ,
      entreCalleA: {
        type: Sequelize.STRING
      }  ,
      entreCalleB: {
        type: Sequelize.STRING
      }     ,
      descripcion: {
        type: Sequelize.STRING
      }   ,
      aCargoDe: {
        type: Sequelize.STRING
      }  ,
      apertura: {
        type: Sequelize.TIME,
      }  ,
      cierre: {
        type: Sequelize.TIME,
      }  ,
      comentarios: {
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
  
    return Sitios;
  };
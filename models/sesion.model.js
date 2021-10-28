module.exports = (sequelize, Sequelize) => {
    const Sesion = sequelize.define("sesiones", {
      SesionId: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      }  ,
      Token: {
        type: Sequelize.TEXT
      }  ,
      FechaCreacion: {
        type: Sequelize.DATE
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
  
    return Sesion;
  };
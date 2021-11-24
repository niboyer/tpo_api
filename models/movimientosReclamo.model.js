module.exports = (sequelize, Sequelize) => {
    const MovimientosReclamo = sequelize.define("movimientosReclamo", {
      idMovimiento: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      responsable: {
        type: Sequelize.STRING
      }, 
      causa: {
        type: Sequelize.STRING
      },
      fecha: {
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

      freezeTableName: true,
    });
    
    return MovimientosReclamo;
  };


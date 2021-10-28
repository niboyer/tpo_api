module.exports = (sequelize, Sequelize) => {
    const Vecino = sequelize.define("vecinos", {
      documento: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      }  ,
      apellido: {
        type: Sequelize.STRING
      }     ,
      direccion: {
        type: Sequelize.STRING
      }   ,
      codigoBarrio: {
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
    });
  
    return Vecino;
  };
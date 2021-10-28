module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuarios", {
      UserId: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      documento: {
        type: Sequelize.STRING
      }  ,
      nombre: {
        type: Sequelize.STRING
      }  ,
      apellido: {
        type: Sequelize.STRING
      }  ,
      password: {
        type: Sequelize.STRING
      }     ,
      preguntaSecreta: {
        type: Sequelize.STRING
      }   ,
      respuestaSecreta: {
        type: Sequelize.STRING
      }  ,
      email: {
        type: Sequelize.STRING
      }  ,
      habilitado: {
        type: Sequelize.BOOLEAN
      }  ,
      primerInicio: {
        type: Sequelize.BOOLEAN
      }  ,
      fechaCreacion: {
        type: Sequelize.DATE
      }  ,
      fechaHabilitacion: {
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
  
    return Usuario;
  };
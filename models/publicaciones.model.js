module.exports = (sequelize, Sequelize) => {
    const Publicacion = sequelize.define("publicaciones", {
      idPublicacion: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      }  ,
      horarios: {
        type: Sequelize.STRING
      }  ,
      rubros: {
        type: Sequelize.STRING
      }  ,
      descripcion: {
        type: Sequelize.STRING
      }     ,
      direccion: {
        type: Sequelize.STRING
      }   ,
      telefono: {
        type: Sequelize.STRING
      }  ,
      email: {
        type: Sequelize.STRING
      }  ,
      urlImagenes: {
        type: Sequelize.STRING
      }  ,
      tipoPublicacion: {
        type: Sequelize.STRING
      },
      estado: {
          type: Sequelize.STRING
      },
      documento: {
        type: Sequelize.STRING
      },  
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
  
    return Publicacion;
  };
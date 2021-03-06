module.exports = (sequelize, Sequelize) => {
    const Reclamo = sequelize.define("reclamos", {
      idReclamo: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      documento: {
        type: Sequelize.STRING
      },
      idSitio: {
        type: Sequelize.INTEGER
      },
      idDesperfecto: {
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },      
      estado: {
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
  
    return Reclamo;
  };
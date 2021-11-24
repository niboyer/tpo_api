module.exports = (sequelize, Sequelize) => {
    const Desperfectos = sequelize.define("desperfectos", {
      idDesperfecto: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      idRubro: {
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
  
    return Desperfectos;
  };
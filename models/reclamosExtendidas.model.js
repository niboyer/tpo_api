module.exports = (sequelize, Sequelize) => {
    const ReclamosExtendida = sequelize.define("reclamosExtendidas", {
      idReclamosExtendidas: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      urlImagenes: {
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
    
    return ReclamosExtendida;
  };


module.exports = (sequelize, Sequelize) => {
    const Rubro = sequelize.define("rubros", {
      idRubro: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
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
    });
  
    return Rubro;
  };
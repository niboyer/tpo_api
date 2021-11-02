module.exports = (sequelize, Sequelize) => {
    const Personal = sequelize.define("personal", {
      legajo: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      }  ,
      apellido: {
        type: Sequelize.STRING
      }  ,
      password: {
        type: Sequelize.STRING
      }  ,
      sector: {
        type: Sequelize.STRING
      }     ,
      cartegoria: {
        type: Sequelize.STRING
      }   ,
      fechaIngreso: {
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
  
    return Personal;
  };
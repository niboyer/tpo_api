const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: '192.168.42.1',
  //port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  dialectOptions: {
    options: {
      instanceName: dbConfig.HOST
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.barrios = require("./barrio.model.js")(sequelize, Sequelize);

module.exports = db;
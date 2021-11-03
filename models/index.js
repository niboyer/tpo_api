const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  /*dialectOptions: {
    options: {
      //instanceName: dbConfig.HOST
    }
  },*/
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

db.usuarios = require('./user.model.js')(sequelize, Sequelize);
db.barrios = require('./barrio.model.js')(sequelize, Sequelize);
db.rubros = require('./rubro.model.js')(sequelize, Sequelize);
db.vecinos = require('./vecino.model.js')(sequelize, Sequelize);
db.sesiones = require('./sesion.model.js')(sequelize, Sequelize);
db.sesionesPersonal = require('./sesionPersonal.model.js')(sequelize, Sequelize);
db.personal = require('./personal.model.js')(sequelize, Sequelize);
db.promociones = require('./promociones.model.js')(sequelize, Sequelize);

module.exports = db;
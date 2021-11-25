const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  dialectOptions: {
    options: {
      instanceName: dbConfig.INSTANCENAME
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

db.barrios = require('./barrio.model.js')(sequelize, Sequelize);

db.denuncias = require('./denuncias.model.js')(sequelize, Sequelize);

db.denunciasExtendidas = require('./denunciasExtendidas.model')(sequelize, Sequelize);
db.denuncias.hasMany(db.denunciasExtendidas, {
  as: "denunciasExtendidas",
  foreignKey: {
    name: 'idDenuncias'
  }
});
db.denunciasExtendidas.belongsTo(db.denuncias, {
  as: "denunciasExtendidas",
  foreignKey: {
    name: 'idDenuncias'
  }
});

db.desperfectos = require('./desperfectos.model.js')(sequelize, Sequelize);

db.movimientosDenuncia = require('./movimientosDenuncia.model.js')(sequelize, Sequelize);
db.denuncias.hasMany(db.movimientosDenuncia, {
  as: "movimientosDenuncia",
  foreignKey: {
    name: 'idDenuncia'
  }
});
db.movimientosDenuncia.belongsTo(db.denuncias, {
  as: "movimientosDenuncia",
  foreignKey: {
    name: 'idDenuncia'
  }
});

db.reclamos = require('./reclamos.model.js')(sequelize, Sequelize);
db.reclamos.hasMany(db.reclamos, {
  as: "children",
  foreignKey: {
    name: 'IdReclamoUnificado'
  }
});
db.reclamos.belongsTo(db.reclamos, {
  as: "parent",
  foreignKey: {
    name: 'IdReclamoUnificado'
  }
});

db.movimientosReclamo = require('./movimientosReclamo.model.js')(sequelize, Sequelize);
db.reclamos.hasMany(db.movimientosReclamo, {
  as: "movimientosReclamo",
  foreignKey: {
    name: 'idReclamo'
  }
});
db.movimientosReclamo.belongsTo(db.reclamos, {
  as: "movimientosReclamo",
  foreignKey: {
    name: 'idReclamo'
  }
});

db.reclamosExtendidas = require('./reclamosExtendidas.model.js')(sequelize, Sequelize);
db.reclamos.hasMany(db.reclamosExtendidas, {
  as: "reclamosExtendidas",
  foreignKey: {
    name: 'idReclamo'
  }
});
db.reclamosExtendidas.belongsTo(db.reclamos, {
  as: "reclamosExtendidas",
  foreignKey: {
    name: 'idReclamo'
  }
});

db.rubros = require('./rubro.model.js')(sequelize, Sequelize);
db.sesiones = require('./sesion.model.js')(sequelize, Sequelize);
db.sesionesPersonal = require('./sesionPersonal.model.js')(sequelize, Sequelize);
db.sitios = require('./sitios.model.js')(sequelize, Sequelize);
db.usuarios = require('./user.model.js')(sequelize, Sequelize);
db.vecinos = require('./vecino.model.js')(sequelize, Sequelize);
db.personal = require('./personal.model.js')(sequelize, Sequelize);
db.publicaciones = require('./publicaciones.model.js')(sequelize, Sequelize);

db.reclamos.hasOne(db.sitios,{
  as: "sitio",
  foreignKey: {
    name: 'idSitio'
  },
  sourceKey: 'idSitio'
});

db.reclamos.hasOne(db.desperfectos,{
  as: "desperfecto",
  foreignKey: {
    name: 'idDesperfecto'
  },
  sourceKey: 'idDesperfecto'
});

module.exports = db;
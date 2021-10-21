module.exports = {
    HOST: "appdistribuidas.database.windows.net",
    PORT: "1433",
    USER: "app",
    PASSWORD: "Distribuidas.2020",
    DB: "SGVECINOS",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
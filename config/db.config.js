module.exports = {
    HOST: "SQLEXPRESS",
    PORT: "1433",
    USER: "sa",
    PASSWORD: "Arg0ntech",
    DB: "SGVECINOS",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
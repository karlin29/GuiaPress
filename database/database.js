const Sequelize = require ("sequelize");

const connection = new Sequelize('ucf132b2097b15cb7e042','ucf132b2097b15cb7e042','pe5224c6c36e5a7a61591',{
    host: 'midas.universidadeglobal.com.br',
    dialect: "mysql",
    timezone: "-03:00"
});

module.exports = connection;
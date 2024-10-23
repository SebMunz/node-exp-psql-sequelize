// models.index.js
// Relaciones, configuración a la conexión de la DB.
"use strict"

const { Sequelize, DataTypes } = require("sequelize")
const dbConfig = require('../config/db.config.js')

// Configuración sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// cargar modelos
/*  db = {} crea un objeto donde almacenar los componentes. Así centralizamos.
    en db.Sequelize y db.sequelize guardamos la clase y su instancia respectivamente.
*/
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Para aclarar: require por node para módulo externo. El resto es la instancia de sequelize.
db.Users = require('./user.model.js')(sequelize, DataTypes);
db.Bootcamps = require('./bootcamp.model.js')(sequelize, DataTypes);

// Creación de la relación muchos a muchos
// Aclaración: le decimos objeto, tabla, relación (con cual se relacion, {a través de qué tabla intermedia })
db.Users.belongsToMany(db.Bootcamps, {
    through: 'UserBootcamps'
});
db.Bootcamps.belongsToMany(db.Users, {
    through: 'UserBootcamps'
});

module.exports = db;
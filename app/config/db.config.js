// config/db.config.js
"use strict"

module.exports = {
    HOST: "localhost",
    USER: "bootcamp_user",
    PASSWORD: "password",
    DB: "db_bootcamp",
    dialect: "postgres",
    /* Usé pool para probar.
    Recordar que: maxConnect, minConnect, tiempo ms intentar conexión, tiempo ms idle */
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
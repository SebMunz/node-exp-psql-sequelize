// server.js
// Sincronización de DB con sequelize y montaje en express
"use strict"

//constantes y middlewares
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./app/models');
const routes = require('./app/routes/app.routes');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', routes);

// Sync
db.sequelize.sync({force: false}).then(() => {
    console.log('Base de datos en sincronía')
}).catch(err => {
    console.error('Error al sincronizar: ', err)
});

//Escucha
app.listen(PORT, () => {
    console.log(`Servidor en: ${PORT}`)
})
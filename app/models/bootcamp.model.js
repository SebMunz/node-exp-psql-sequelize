// models/bootcamp.model.js
// Define modelo de Bootcamp
"use strict"

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Bootcamp = sequelize.define('Bootcamps',{
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 5,
                max: 20
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true
    });

    return Bootcamp;
}


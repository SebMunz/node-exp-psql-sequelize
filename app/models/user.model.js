// models/user.model.js
// Define modelo de usuario
"use strict"

const { DataTypes } = require("sequelize");
const { default: isEmail } = require("validator/lib/isEmail");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    }, {
        timestamps: true
    });
    return User;
}
// app/controllers/bootcamp.controller.js
"use strict"

const db = require('../models');
const Bootcamps = db.Bootcamps;

// Crear nuevo Bootcamp
exports.createBootcamp = async(req,res) => {
    try {
        const {title, cue, description} = req.body;
        const bootcamp = await Bootcamps.create({title, cue, description});
        res.status(201).json(bootcamp);
    } catch (error){
        res.status(500).json({message: 'Error al crear el bootcamp: ', error: error.message})
    }
};

//Traer bootcamps con sus usuarios
exports.findAll = async(req,res) => {
    try {
        const bootcamps = await Bootcamps.findAll({include: db.Users});
        res.status(200).json(bootcamps);
    } catch (error){
        res.status(500).json({message: 'Error al obtener bootcamps: ', error: error.message});
    }
};

//Obtener un bootcamp por ID con usuarios
exports.findById = async(req,res)  =>{
    try {
        const bootcamp = await Bootcamps.findByPk(req.params.id, {include: db.Users});
        if (bootcamp) {
            res.status(200).json(bootcamp);
        } else {
            res.status(404).json({message: 'Bootcamp no encontrado'});
        }
    } catch (error){
        res.status(500).json({message: 'Error al obtener el bootcamp: ', error: error.message})
    }
}
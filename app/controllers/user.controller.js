// app/controllers/user.controller.js
"use strict"
const db = require('../models');
const Users = db.Users;
const Bootcamps = db.Bootcamps; // para la asociación

//Crear nuevo Usuario
exports.createUser = async(req,res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const user = await Users.create({firstName, lastName, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: 'Error al crear el usuario: ', error: error.message});
    }
};

//Traer todos los usuarios con sus respectivos bootcamps
exports.findAll = async(req,res) =>{
    try {
        const users = await Users.findAll({include: db.Bootcamps});
        res.status(200).json(users);
    } catch (error){
        res.status(500).json({message: 'Error al obtener los usuarios: ', error: error.message});
    }
};

//Traer por usuario por ID con su respectivo bootcamp
exports.findUserById = async(req,res) => {
    try {
        const user = await Users.findByPk(req.params.id, {include: db.Bootcamps});
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'Usuario no encontrado'});
        }
    } catch (error){
        res.status(500).json({message: 'Error al obtener el usuario: ', error: error.message});
    }
};

//Actualizar usuario por ID
exports.updateUserById = async(req,res) =>{
    try {
        const [actualizador] = await Users.update(req.body, {where: {id:req.params.id}});
        if (actualizador) {
            const usuarioActualizado = await Users.findByPk(req.params.id);
            res.status(200).json(usuarioActualizado);
        } else {
            res.status(404).json({message: 'Usuario no encontrado'});
        }
    } catch (error){
        res.status(500).json({message: 'Error al actualizar el usuario: ', error: error.message});
    }
};

//Eliminar usuario por ID
exports.deleteUserById = async(req,res) => {
    try {
        const eliminador = await Users.destroy({where: {id: req.params.id}});
        if (eliminador) {
            res.status(204).json();
        } else {
            res.status(404).json({message: 'Error al eliminar el usuario: ', error: error.message});
        }
    } catch (error){
        res.status(500).json({message: 'Error al eliminar el usuario: ', error: error.message});
    }
};

// Asignar usuario a bootcamp
exports.addBootcampToUser = async (req, res) => {
    try {
        const { userId, bootcampId } = req.params;
        const user = await Users.findByPk(userId);
        const bootcamp = await Bootcamps.findByPk(bootcampId);

        //si no hay usuario y/o no hay bootcamp: 404
        if (!user || !bootcamp) {
            return res.status(404).json({ message: 'Usuario o Bootcamp no encontrado' });
        }

        await user.addBootcamp(bootcamp);
        res.status(200).json({ message: `Bootcamp agregado al usuario ${userId}` });
    } catch (error) {
        res.status(500).json({ message: 'Error al asociar bootcamp con usuario', error: error.message });
    }
};
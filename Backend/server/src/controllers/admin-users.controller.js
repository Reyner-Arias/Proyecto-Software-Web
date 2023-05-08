const adminUserController = {};

const User = require('../models/user')
const axios = require('axios');

// Crear un nuevo usuario
adminUserController.postUser = async (req, res) => {
  const { username, email, name } = req.body
  const newUser = new User({ username, email, name })

  newUser.save((err) => {
    if (err) {
      if (err.code === 11000) {
        res.status(422).json('Error: El usuario ya existe, verificar nombre de usuario y correo únicos.');
      }
      else{
        res.status(500).json(err.message)
      }
      
    } else {
      res.status(201).json('El usuario se ha creado correctamente.')
    }
  })
};

// Obtener todos los usuarios
adminUserController.getAllUsers = async (req, res) => {
  User.find({}, (err, Users) => {
    if (err) {
      res.status(500).json(err.message)
    } else {
      res.status(200).json(Users)
    }
  })
};

// Actualizar un usuario
adminUserController.putUser = async (req, res) => {
  var updatedFields = {};
  const { _id } = req.params
  const { username, email, name } = req.body

  if(username) {
    Object.assign(updatedFields, {username: username})
  }

  if(email) {
    Object.assign(updatedFields, {email: email})
  }

  if(name) {
    Object.assign(updatedFields, {name: name})
  }

  var updatedFieldsSet =  { $set: updatedFields };

  User.findOneAndUpdate({ _id: _id }, updatedFieldsSet, async (err, user) => {
    if (err) {
      if (err.code === 11000) {
        return res.status(422).json('Error: El usuario ya existe, verificar nombre de usuario y correo únicos.');
      } else {
        return res.status(500).json(err.message)
      }
    } else if (!user) {
      return res.status(404).json('Error: No se ha encontrado el usuario solicitado.');
    } else {
      return res.status(200).json('Los campos válidos del usuario se han actualizado correctamente.');
    }
  })
}

module.exports = adminUserController;
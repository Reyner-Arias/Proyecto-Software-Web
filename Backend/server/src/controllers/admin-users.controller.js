const adminUserController = {};

const User = require('../models/user')
const path = require("path");
const fs = require("fs");

function isValidImageExtension(imagepath) {
  switch (path.extname(imagepath).toLowerCase()) {
    case '.png': return true;
    case '.jpg': return true;
    case '.jpeg': return true;
    default: return false;
  }
}

function getImageExtension(imagepath) {
  switch (path.extname(imagepath)) {
    case '.png': return 'image/png';
    case '.jpg': return 'image/jpg';
    case '.jpeg': return 'image/jpeg';
    default: return '';
  }
}

// Crear un nuevo usuario
adminUserController.postUser = async (req, res) => {
  const newUser = new User();

  if(!req.body.username || !req.body.email || !req.body.name ||
    !req.body.facepath || !req.body.instapath || !req.body.twitterpath) {
    return res.status(500).json('Error: No se encontraron todos los datos del usuario.');
  }

  if (isValidImageExtension(req.body.facepath) && isValidImageExtension(req.body.instapath) && 
    isValidImageExtension(req.body.twitterpath)) {
    if(req.body.facepath) {
      if(fs.existsSync(req.body.facepath)){
        newUser.facebook = {tipoImagen: getImageExtension(req.body.facepath),
          data: fs.readFileSync(req.body.facepath)}
      }else{
        return res.status(500).json('Error: No se encontró la imagen del código QR de Facebook.');
      }
    }

    if(req.body.instapath) {
      if(fs.existsSync(req.body.instapath)){
        newUser.instagram = {tipoImagen: getImageExtension(req.body.instapath),
          data: fs.readFileSync(req.body.instapath)}
      }else{
        return res.status(500).json('Error: No se encontró la imagen del código QR de Instagram.');
      }
    }
    
    if(req.body.twitterpath) {
      if(fs.existsSync(req.body.twitterpath)){
        newUser.twitter = {tipoImagen: getImageExtension(req.body.twitterpath),
          data: fs.readFileSync(req.body.twitterpath)}
      }else{
        return res.status(500).json('Error: No se encontró la imagen del código QR de Twitter.');
      }
    }
  }

  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.name = req.body.name;

  newUser.save((err) => {
    if (err) {
      if (err.code === 11000) {
        return res.status(422).json('Error: El usuario ya existe, verificar nombre de usuario y correo únicos.');
      }
      else{
        return res.status(500).json(err.message)
      }
      
    } else {
      return res.status(201).json('El usuario se ha creado correctamente.')
    }
  })
};

// Obtener todos los usuarios
adminUserController.getAllUsers = async (req, res) => {
  User.find({}, (err, Users) => {
    if (err) {
      return res.status(500).json(err.message)
    } else {
      return res.status(200).json(Users)
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
const adminUserController = {};

const User = require('../models/user')
const path = require("path");
const fs = require("fs");
const axios = require('axios');

function isValidImageExtension(imagepath) {
  switch (path.extname(imagepath).toLowerCase()) {
    case '.png': return true;
    case '.jpg': return true;
    case '.jpeg': return true;
    default: return false;
  }
}

function isValidTypeOfUser(type) {
  return type == "desarrollador" || 
  type == "administrador" ||
  type == "soporte";
}

function clearFilesDirectory(archivosSubidos){
  // Eliminar los archivos después agregarlos a ./files
  if (archivosSubidos) {
    for (const campo in archivosSubidos) {
      if (Array.isArray(archivosSubidos[campo])) {
        archivosSubidos[campo].forEach((archivo) => {
          fs.unlink(".\\" + archivo.path, (err) => {
            if (err) {
              console.error('Error al eliminar el archivo temporal:', err);
            }
          });
        });
      }
    }
  }
}

// Crear un nuevo usuario
adminUserController.postUser = async (req, res) => {
  const newUser = new User();

  const facebookFile = req.files['facebook'][0];
  const instaFile = req.files['instagram'][0];
  const twitterFile = req.files['twitter'][0];

  if(!req.body.username || !req.body.email || !req.body.name || !req.body.type ||
    !facebookFile || !instaFile || !twitterFile) {
    return res.status(500).json('Error: No se encontraron todos los datos del usuario.');
  }

  if(!isValidTypeOfUser(req.body.type)) {
    return res.status(500).json('Error: Tipo de usuario no válido.');
  }

  if (isValidImageExtension(facebookFile.path) && isValidImageExtension(instaFile.path) && 
    isValidImageExtension(twitterFile.path)) {
    if(facebookFile) {
      newUser.facebook = {tipoImagen: facebookFile.type,
        data: fs.readFileSync(facebookFile.path)}
    }

    if(instaFile) {
      newUser.instagram = {tipoImagen: instaFile.type,
        data: fs.readFileSync(instaFile.path)}
    }
    
    if(twitterFile) {
        newUser.twitter = {tipoImagen: twitterFile.type,
          data: fs.readFileSync(twitterFile.path)}
    }
  }

  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.name = req.body.name;
  newUser.type = req.body.type;
        
  clearFilesDirectory(req.files);

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
  var user = req.body;

  var facebookFile = undefined;
  var instaFile = undefined;
  var twitterFile = undefined;

  if(req.files['facebook']){
    facebookFile = req.files['facebook'][0];
  }
  if(req.files['instagram']){
    instaFile = req.files['instagram'][0];
  }
  if(req.files['twitter']){
    twitterFile = req.files['twitter'][0];
  }

  if(user.type && !isValidTypeOfUser(user.type)) {
    return res.status(500).json('Error: Tipo de usuario no válido.');
  }

  if(facebookFile) {
    if (isValidImageExtension(facebookFile.path)) {
      Object.assign(updatedFields, { facebook: {tipoImagen: facebookFile.type, 
        data: fs.readFileSync(facebookFile.path)} });
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(instaFile) {
    if (isValidImageExtension(instaFile.path)) {
      Object.assign(updatedFields, { instagram: {tipoImagen: instaFile.type, 
        data: fs.readFileSync(instaFile.path)} });
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(twitterFile) {
    if (isValidImageExtension(twitterFile.path)) {
      Object.assign(updatedFields, { twitter: {tipoImagen: twitterFile.type, 
        data: fs.readFileSync(twitterFile.path)} });
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(user.username) {
    Object.assign(updatedFields, {username: user.username})
  }

  if(user.email) {
    Object.assign(updatedFields, {email: user.email})
  }

  if(user.name) {
    Object.assign(updatedFields, {name: user.name})
  }

  if(user.type) {
    Object.assign(updatedFields, {type: user.type})
  }
        
  clearFilesDirectory(req.files);

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

// Eliminar un usuario
adminUserController.deleteUser = async (req, res) => {
  const { email } = req.params;

  User.findOneAndDelete({ email: email }, async (err, user) => {
    if (err) {
      return res.status(500).json(err.message)
    } else if (!user) {
      return res.status(404).json('Error: No se ha encontrado el usuario.')
    } else {  
      return res.status(200).json('El usuario se ha eliminado correctamente.')
    }
  });
}

// Obtener un usuario
adminUserController.getUser = async (req, res) => {
  const { email } = req.params;

  User.findOne({ email: email }, async (err, user) => {
    if (err) {
      return res.status(500).json(err.message)
    } else if (!user) {
      return res.status(404).json('Error: No se ha encontrado el usuario.')
    } else {
      return res.status(200).json(user)
    }
  });
}

module.exports = adminUserController;
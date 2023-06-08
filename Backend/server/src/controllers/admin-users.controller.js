const adminUserController = {};

const User = require('../models/user')
const path = require("path");
const fs = require("fs");
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');

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

function isValidTypeOfUser(type) {
  return type == "desarrollador" || 
  type == "administrador" ||
  type == "soporte";
}

// Crear un nuevo usuario
adminUserController.postUser = async (req, res) => {
  if(req.login_type != "administrador") {
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

  const newUser = new User();

  if(!req.body.username || !req.body.email || !req.body.name || !req.body.type ||
    !req.body.facepath || !req.body.instapath || !req.body.twitterpath) {
    return res.status(500).json('Error: No se encontraron todos los datos del usuario.');
  }

  if(!isValidTypeOfUser(req.body.type)) {
    return res.status(500).json('Error: Tipo de usuario no válido.');
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
  newUser.type = req.body.type;

  newUser.save((err) => {
    if (err) {
      if (err.code === 11000) {
        return res.status(422).json('Error: El usuario ya existe, verificar nombre de usuario y correo únicos.');
      } else{
        return res.status(500).json(err.message)
      }
    } else {
      return res.status(201).json('El usuario se ha creado correctamente.')
    }
  })
};

adminUserController.register = async (req, res) => {
  const newUser = new User();

  if(!req.body.username || !req.body.email || !req.body.name || !req.body.type ||
    !req.body.facepath || !req.body.instapath || !req.body.twitterpath) {
    return res.status(500).json('Error: No se encontraron todos los datos del usuario.');
  }

  if(!isValidTypeOfUser(req.body.type)) {
    return res.status(500).json('Error: Tipo de usuario no válido.');
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
  newUser.type = req.body.type;

  newUser.save((err) => {
    if (err) {
      if (err.code === 11000) {
        return res.status(422).json('Error: El usuario ya existe, verificar nombre de usuario y correo únicos.');
      } else{
        return res.status(500).json(err.message)
      }
    } else {
      return res.status(201).json('El usuario se ha creado correctamente.')
    }
  })
};

adminUserController.mail = async (req, res) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'excalinest@gmail.com',
      pass: 'gcgihwvlpixocgqy'
    }
  });
  
  const info = await transporter.sendMail({
    from: 'Excalinest <excalinest@gmail.com>',
    to: req.body.email,
    subject: 'Excalinest verification code',
    html: '<h1>Your verification code is:</h1><p>'+req.body.username+'</p>',
  })

  return res.status(200).json('Código enviado exitosamente.');
}

// Obtener todos los usuarios
adminUserController.getAllUsers = async (req, res) => {
  if(req.login_type != "administrador") {
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

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
  if(req.login_type != "administrador") {
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

  var updatedFields = {};
  const { _id } = req.params
  var user = req.body;

  if(user.type && !isValidTypeOfUser(user.type)) {
    return res.status(500).json('Error: Tipo de usuario no válido.');
  }

  if(user.facepath) {
    if (isValidImageExtension(user.facepath)) {
      if(fs.existsSync(user.facepath)) {
        Object.assign(updatedFields, { facebook: {tipoImagen: getImageExtension(user.facepath), 
          data: fs.readFileSync(user.facepath)} });
      } else {
        return res.status(500).json('Error: No se ha encontrado la imagen del código QR de Facebook.');
      }
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(user.instapath) {
    if (isValidImageExtension(user.instapath)) {
      if(fs.existsSync(user.instapath)) {
        Object.assign(updatedFields, { instagram: {tipoImagen: getImageExtension(user.instapath), 
          data: fs.readFileSync(user.instapath)} });
      } else {
        return res.status(500).json('Error: No se ha encontrado la imagen del código QR de Instagram.');
      }
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(user.twitterpath) {
    if (isValidImageExtension(user.twitterpath)) {
      if(fs.existsSync(user.twitterpath)) {
        Object.assign(updatedFields, { twitter: {tipoImagen: getImageExtension(user.twitterpath), 
          data: fs.readFileSync(user.twitterpath)} });
      } else {
        return res.status(500).json('Error: No se ha encontrado la imagen del código QR de Twitter.');
      }
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

// Actualizar el perfil
adminUserController.putProfile = async (req, res) => {
  var updatedFields = {};
  const { _id } = req.params
  var user = req.body;

  if(user.type && !isValidTypeOfUser(user.type)) {
    return res.status(500).json('Error: Tipo de usuario no válido.');
  }

  if(user.facepath) {
    if (isValidImageExtension(user.facepath)) {
      if(fs.existsSync(user.facepath)) {
        Object.assign(updatedFields, { facebook: {tipoImagen: getImageExtension(user.facepath), 
          data: fs.readFileSync(user.facepath)} });
      } else {
        return res.status(500).json('Error: No se ha encontrado la imagen del código QR de Facebook.');
      }
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(user.instapath) {
    if (isValidImageExtension(user.instapath)) {
      if(fs.existsSync(user.instapath)) {
        Object.assign(updatedFields, { instagram: {tipoImagen: getImageExtension(user.instapath), 
          data: fs.readFileSync(user.instapath)} });
      } else {
        return res.status(500).json('Error: No se ha encontrado la imagen del código QR de Instagram.');
      }
    } else {
      return res.status(500).json('Error: La imagen debe tener formato jpg, jpeg o png.');
    }
  }

  if(user.twitterpath) {
    if (isValidImageExtension(user.twitterpath)) {
      if(fs.existsSync(user.twitterpath)) {
        Object.assign(updatedFields, { twitter: {tipoImagen: getImageExtension(user.twitterpath), 
          data: fs.readFileSync(user.twitterpath)} });
      } else {
        return res.status(500).json('Error: No se ha encontrado la imagen del código QR de Twitter.');
      }
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
  if(req.login_type != "administrador") {
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

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
  User.findOne({ email: req.login_email }, async (err, user) => {
    if (err) {
      return res.status(500).json(err.message)
    } else if (!user) {
      return res.status(404).json('Error: No se ha encontrado el usuario.')
    } else {
      return res.status(200).json(user)
    }
  });
}

adminUserController.login = async (req, res) => {
  const { email } = req.params;

  User.findOne({ email: email }, async (err, user) => {
    if (err) {
      return res.status(500).json(err.message)
    } else if (!user) {
      return res.status(404).json('Error: No se ha encontrado el usuario.')
    } else {
      const token = jwt.sign({email: user.email, type: user.type, username: user.username}, 'secretkey')
      return res.status(200).json({user: user, token: token})
    }
  });
}

module.exports = adminUserController;
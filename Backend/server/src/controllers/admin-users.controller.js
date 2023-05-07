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

// Obtener un usuario específico
adminUserController.getUser = async (req, res) => {
  const { id } = req.params
  User.findOne({ id }, (err, User) => {
    if (err) {
      res.status(500).json(err.message)
    } else if (!User) {
      res.status(404).json('Error: No se ha encontrado la etiqueta solicitada.')
    } else {
      res.status(200).json(User)
    }
  })
};

// Actualizar un usuario
adminUserController.putUser = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const updatedUser = await User.findOneAndUpdate({ id }, { name }, { new: true });

    if (!updatedUser) {
      return res.status(404).json('Error: No se ha encontrado la etiqueta solicitada.')
    }

    res.status(200).json('La etiqueta se ha actualizado exitosamente.')
  } catch (err) {
    if (err.code === 11000) {
      return res.status(422).json('Error: La etiqueta ya existe, cambiar el nombre.');
    } else {
      return res.status(500).json(err.message)
    }
  }
}


// Eliminar un usuario
adminUserController.deleteUser = async (req, res) => {
  const { id } = req.params;

  const options = {
    'method': 'GET',
    'url': 'http://localhost:3000/admin-videogames/get-only-specific-User-count' +`/${id}`
  }

  try{  
    // Verificar si hay uno o más videojuegos que solo tengan la etiqueta a eliminar
    const result = await axios(options);
    const count = result.data;
    if (count > 0) {
      return res.status(400).json('Error: No se puede eliminar porque es la única etiqueta de uno o más videojuegos');
    }

    // Eliminar la etiqueta
    const deletedUser = await User.findOneAndDelete({ id });

    if (!deletedUser) {
      return res.status(404).json('Error: No se ha encontrado la etiqueta solicitada.')
    }

    await axios.delete("http://localhost:3000/videogame-User/delete-by-User/"+`${id}`)

    res.status(200).json('La etiqueta se ha eliminado correctamente.')
  }
  catch(err) {
    return res.status(500).json(err.message);
  }
};

adminUserController.getMaxId = async (req, res) => {
  User.find({}, { _id: 0, id: 1 }, { sort: { id: -1 }, limit: 1 }, (err, result) => {
    if (err) {
      res.status(500).json( err.message )
    } else {
      if(result.length == 0) {
        res.status(200).json(0)
      } else {
        res.status(200).json(result[0].id)
      }
    }
  })
};

module.exports = adminUserController;
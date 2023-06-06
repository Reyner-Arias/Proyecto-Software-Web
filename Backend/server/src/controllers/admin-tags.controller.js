const adminTagController = {};

const Tag = require('../models/Tag')
const axios = require('axios')

// Crear una nueva etiqueta
adminTagController.postTag = async (req, res) => {
  if(req.login_type != "administrador") {
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

  const { id, name } = req.body
  const newTag = new Tag({ id, name })

  newTag.save((err) => {
    if (err) {
      if (err.code === 11000) {
        res.status(422).json('Error: La etiqueta ya existe, cambiar el nombre.');
      }
      else{
        res.status(500).json(err.message)
      }
      
    } else {
      res.status(201).json('La etiqueta se ha creado correctamente.')
    }
  })
};

// Obtener todas las etiquetas del sistema
adminTagController.getTags = async (req, res) => {
  if(req.login_type != "administrador") {
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

  Tag.find({}, (err, tags) => {
    if (err) {
      res.status(500).json(err.message)
    } else {
      res.status(200).json(tags)
    }
  })
};

// Obtener una etiqueta específica
adminTagController.getTag = async (req, res) => {
  if(req.login_type != "administrador") {
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

  const { id } = req.params
  Tag.findOne({ id }, (err, tag) => {
    if (err) {
      res.status(500).json(err.message)
    } else if (!tag) {
      res.status(404).json('Error: No se ha encontrado la etiqueta solicitada.')
    } else {
      res.status(200).json(tag)
    }
  })
};

// Actualizar una etiqueta
adminTagController.putTag = async (req, res) => {
  if(req.login_type != "administrador") {
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

  const { id } = req.params
  const { name } = req.body

  try {
    // Actualizar la etiqueta en la colección de etiquetas
    const updatedTag = await Tag.findOneAndUpdate({ id }, { name }, { new: true });

    if (!updatedTag) {
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


// Eliminar una etiqueta
adminTagController.deleteTag = async (req, res) => {
  if(req.login_type != "administrador") {
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

  const { id } = req.params;

  try {
    axios.interceptors.request.use(config => {
      config.headers.Authorization = req.token;
      return config;
    });
  
    const options = {
      'method': 'GET',
      'url': 'http://localhost:3000/admin-videogames/get-only-specific-tag-count' +`/${id}`
    }

    // Verificar si hay uno o más videojuegos que solo tengan la etiqueta a eliminar
    const result = await axios(options);
    const count = result.data;
    if (count > 0) {
      return res.status(400).json('Error: No se puede eliminar porque es la única etiqueta de uno o más videojuegos');
    }

    // Eliminar la etiqueta
    const deletedTag = await Tag.findOneAndDelete({ id });

    if (!deletedTag) {
      return res.status(404).json('Error: No se ha encontrado la etiqueta solicitada.')
    }

    await axios.delete("http://localhost:3000/videogame-tag/delete-by-tag/"+`${id}`)

    res.status(200).json('La etiqueta se ha eliminado correctamente.')
  }
  catch(err) {
    return res.status(500).json(err.message);
  }
};

adminTagController.getMaxId = async (req, res) => {
  if(req.login_type != "administrador") {
    return res.status(401).json('Error: Usuario no autorizado para esta funcionalidad.');
  }

  Tag.find({}, { _id: 0, id: 1 }, { sort: { id: -1 }, limit: 1 }, (err, result) => {
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

module.exports = adminTagController;
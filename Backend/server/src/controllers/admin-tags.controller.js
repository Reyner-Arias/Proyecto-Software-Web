const adminTagController = {};

const Tag = require('../models/Tag')
const Videogame = require('../models/videogame');
const axios = require('axios');


// Crear una nueva etiqueta
adminTagController.postTag = async (req, res) => {
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

// Obtener todas las etiquetas
adminTagController.getTags = async (req, res) => {
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

  // Actualizar la etiqueta en todos los videojuegos que la contengan
  try {
    await Videogame.updateMany({ tags: { $elemMatch: { id } } }, { $set: { "tags.$.name": name } });
  } catch (err) {
    return res.status(500).json(err.message)
  }
  
}

// Eliminar una etiqueta
adminTagController.deleteTag = async (req, res) => {
  const { id } = req.params;

  const options = {
    'method': 'GET',
    'url': 'http://localhost:3000/admin-videogames/get-only-specific-tag-count' +`/${id}`
  }

  try{  
    // Verificar si hay uno o más videojuegos que solo tengan la etiqueta a eliminar
    const result = await axios(options);
    const count = result.data;
    if (count > 0) {
      return res.status(400).json('Error: No se puede eliminar porque es la única etiqueta de uno o más videojuegos');
    }

    // Eliminar la etiqueta
    Tag.findOneAndDelete({ id }, async (err, tag) => {
      if (err) {
        res.status(500).json(err.message)
      } else if (!tag) {
        res.status(404).json('Error: No se ha encontrado la etiqueta solicitada.')
      } else {
        // Eliminar la etiqueta de los videojuegos que la tienen
        const videogames = await Videogame.find({ tags: { $elemMatch: { id } } });
        const videogameIds = videogames.map(v => v._id);
        await Videogame.updateMany({ _id: { $in: videogameIds } }, { $pull: { tags: { id } } });

        res.status(200).json('La etiqueta se ha eliminado correctamente.')
      }
    })
  }
  catch(err){
    console.log(err);
    return res.status(500).json(err.message);
  }
  
};

adminTagController.getMaxId = async (req, res) => {
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
const videogameTagController = {};

const VideogameTag = require('../models/videogame-tag')

// Crear una nueva relación
videogameTagController.postVideogameTag = async (req, res) => {
  const { videogame, tag } = req.body
  const newVideogameTag = new VideogameTag({ videogame, tag })

  newVideogameTag.save((err) => {
    if (err) {
      if (err.code !== 11000) {
        res.status(500).json(err.message)
      } else {
        res.status(201).json('La relación existe en la base de datos.')
      }
    } else {
      res.status(201).json('La relación se ha creado correctamente.')
    }
  })
};

videogameTagController.videogameTagExists = async (req, res) => {
  const { videogame, tag } = req.body

  VideogameTag.findOne({ videogame, tag }, (err, videogameTag) => {
    if (err) {
      res.status(500).json(err.message)
    } else if (!videogameTag) {
      res.status(404).json(null)
    } else {
      res.status(200).json(videogameTag)
    }
  })
};

/*
// Obtener todas las etiquetas
videogameTagController.getTags = async (req, res) => {
  Tag.find({}, (err, tags) => {
    if (err) {
      res.status(500).json(err.message)
    } else {
      res.status(200).json(tags)
    }
  })
};

// Obtener una etiqueta específica
videogameTagController.getTag = async (req, res) => {
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
videogameTagController.putTag = async (req, res) => {
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
videogameTagController.deleteTag = async (req, res) => {
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
    const deletedTag = await Tag.findOneAndDelete({ id });

    if (!deletedTag) {
      return res.status(404).json('Error: No se ha encontrado la etiqueta solicitada.')
    }

    res.status(200).json('La etiqueta se ha eliminado correctamente.')
  }
  catch(err){
    console.log(err);
    return res.status(500).json(err.message);
  }
};

videogameTagController.getMaxId = async (req, res) => {
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
};*/

module.exports = videogameTagController;
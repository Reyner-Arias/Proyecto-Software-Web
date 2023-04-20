const videogameTagController = {};

const VideogameTag = require('../models/videogame-tag')
const axios = require('axios');

videogameTagController.postVideogameTag = async (req, res) => {
  const { videogame, tag } = req.body
  const newVideogameTag = new VideogameTag({ videogame, tag })

  try {
    let videogameTagExists = await axios.get("http://localhost:3000/videogame-tag/exists/"+videogame+"/"+tag);
    if(!videogameTagExists.data) {
      newVideogameTag.save((err) => {
        if (err) {
          res.status(500).json(err.message)
        } else {
          res.status(201).json('La relación videojuego-etiqueta se ha creado correctamente.')
        }
      })
    } else {
      res.status(201).json('La relación videojuego-etiqueta está registrada en la base de datos.')
    }
  } catch(err) {
    return res.status(500).json(err.message);
  }
};

videogameTagController.videogameTagExists = async (req, res) => {
  const { videogame, tag } = req.params

  VideogameTag.findOne({ videogame, tag }, (err, videogameTag) => {
    if (err) {
      res.status(500).json(err.message)
    } else if (!videogameTag) {
      res.status(200).json(null)
    } else {
      res.status(200).json(videogameTag)
    }
  })
};

videogameTagController.getVideogameTags = async (req, res) => {
  const { videogame } = req.params
  VideogameTag.find({ videogame }, (err, videogameTags) => {
    if (err) {
      res.status(500).json(err.message)
    } else if (!videogameTags) {
      res.status(404).json('Error: No se han encontrado etiquetas asociadas al videojuego.')
    } else {
      res.status(200).json(videogameTags.map(({ tag }) => tag))
    }
  })
};

videogameTagController.updateVideogameTag = async (req, res) => {
  const { _id, tags } = req.body;
  let currentTags = [];

  try {
    const options = {'method': 'GET','url': 'http://localhost:3000/videogame-tag/get/' +`${_id}`}
    currentTags = await axios(options);
  } catch(err) {
    return res.status(500).json(err.message);
  }

  for(const id of tags) {
    try {
      await axios.post("http://localhost:3000/videogame-tag/post", {videogame: _id, tag: id});
    } catch(err) {
      return res.status(500).json(err.message);
    }
  }

  for(let i = 0; i < currentTags.data.length; i++) {
    if(tags.indexOf(currentTags.data[i]) == -1) {
      try {
        await axios.delete("http://localhost:3000/videogame-tag/delete/" + _id + "/" + currentTags.data[i]);
      } catch(err) {
        return res.status(500).json(err.message);
      }
    }
  }

  return res.status(200).json("Relación videojuego-etiqueta actualizada exitosamente.");
};

// Eliminar una relación videojuego-etiqueta específica
videogameTagController.deleteVideogameTag = async (req, res) => {
  const { videogame, tag } = req.params;
  VideogameTag.deleteOne({ videogame: videogame, tag: tag }, async (err, videogameTag) => {
    if (err) {
      return res.status(500).json(err.message)
    } else if (!videogameTag) {
      return res.status(404).json('Error: No se ha encontrado la relación videojuego-etiqueta.')
    } else {  
      return res.status(200).json('Relación videojuego-etiqueta eliminada.');
    }
  })
};

// Eliminar relaciones con videojuego específico
videogameTagController.deleteVTagByVideogame = async (req, res) => {
  const { videogame } = req.params;
  VideogameTag.deleteMany({ videogame: videogame }, async (err, videogameTags) => {
    if (err) {
      return res.status(500).json(err.message)
    } else if (!videogameTags) {
      return res.status(200).json('Relaciones videojuego-etiqueta eliminadas.')
    } else {  
      return res.status(200).json('Relaciones videojuego-etiqueta eliminadas.');
    }
  })
};

// Eliminar relaciones con etiqueta específica
videogameTagController.deleteVideogameTByTag = async (req, res) => {
  const { tag } = req.params;
  VideogameTag.deleteMany({ tag: tag }, async (err, videogameTags) => {
    if (err) {
      return res.status(500).json(err.message)
    } else if (!videogameTags) {
      return res.status(200).json('Relaciones videojuego-etiqueta eliminadas.')
    } else {  
      return res.status(200).json('Relaciones videojuego-etiqueta eliminadas.');
    }
  })
};

module.exports = videogameTagController;
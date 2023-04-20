const videogameTagController = {};

const VideogameTag = require('../models/videogame-tag')
const axios = require('axios');

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
  const { _id } = req.body
  let currentTags = [];

  try{
    const options = {'method': 'GET','url': 'http://localhost:3000/videogame-tag/get/' +`${req.body._id}`}
    currentTags = await axios(options);
  } catch(err) {
    return res.status(500).json(err.message);
  }

  for(const id of req.body.tags) {
    let newVideogameTag = {videogame: _id, tag: id};
    let videogameTagExists = await axios.get("http://localhost:3000/videogame-tag/exists/"+_id+"/"+id);
    if(!videogameTagExists.data) {
      await axios.post("http://localhost:3000/videogame-tag/post", newVideogameTag);
    }
    currentTags.data.splice(currentTags.data.indexOf(id), 1);
  }

  for(const tag of currentTags.data) {
    await axios.delete("http://localhost:3000/videogame-tag/delete/" + _id + "/" + tag);
  }

  return res.status(200).json("Relación actualizada exitosamente");
};

// Eliminar una relación específica
videogameTagController.deleteVideogameTag = async (req, res) => {
  const { videogame, tag } = req.params;
  VideogameTag.deleteOne({ videogame: videogame, tag: tag }, async (err, videogameTag) => {
    if (err) {
      return res.status(500).json(err.message)
    } else if (!videogameTag) {
      return res.status(404).json('Error: No se ha encontrado la relación.')
    } else {  
      return res.status(200).json('Relación eliminada.');
    }
  })
};

// Eliminar relaciones con videojuego específico
videogameTagController.deleteVTagByVideogame = async (req, res) => {
  console.log("Parámetros " + req.params.videogame)
  const { videogame } = req.params;
  VideogameTag.deleteMany({ videogame: videogame }, async (err, videogameTags) => {
    if (err) {
      return res.status(500).json(err.message)
    } else if (!videogameTags) {
      return res.status(200).json('Relaciones eliminadas.')
    } else {  
      return res.status(200).json('Relaciones eliminadas.');
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
      return res.status(200).json('Relaciones eliminadas.')
    } else {  
      return res.status(200).json('Relaciones eliminadas.');
    }
  })
};

module.exports = videogameTagController;
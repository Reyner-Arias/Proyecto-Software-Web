const devVideogameController = {};

const Videogame = require("../models/videogame");

// Obtener los videojuegos de un desarrollador específico
devVideogameController.getVideogames = async (req, res) => {
  Videogame.find({ usuario: req.params.developer }, (err, videogames) => {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(200).send(videogames)
    }
  })
};

module.exports = devVideogameController;
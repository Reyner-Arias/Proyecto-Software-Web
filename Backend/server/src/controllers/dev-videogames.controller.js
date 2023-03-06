const devVideogameController = {};

const Videogame = require("../models/videogame");
const mongodb = require("mongodb");

devVideogameController.getVideogames = async (req, res) => {
  console.log(req.params.developer);
  const foundVideogames = await Videogame.find({
    usuario: req.params.developer
  });
  res.send(foundVideogames);
};

module.exports = devVideogameController;
const devVideogameController = {};

const Videogame = require("../models/Videogame");
const mongodb = require("mongodb");

devVideogameController.getVideogames = async (req, res) => {
  console.log(req.params.developer);
  const foundVideogames = await Videogame.find({
    developer: req.params.developer
  });
  res.send(foundVideogames);
};

module.exports = devVideogameController;
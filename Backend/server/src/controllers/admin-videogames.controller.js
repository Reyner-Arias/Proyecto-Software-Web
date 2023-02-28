const adminVideogameController = {};

const Videogame = require("../models/Videogame");
const mongodb = require("mongodb");

adminVideogameController.postVideogame = async (req, res) => {
  const newVideogame = new Videogame(req.body);
  await newVideogame.save();
  res.send("Videogame posted successfully");
};

adminVideogameController.getVideogamesByDeveloper = async (req, res) => {
  const foundVideogames = await Videogame.find({
    developer: req.body.developer
  });
  res.send(foundVideogames);
};

module.exports = adminVideogameController;
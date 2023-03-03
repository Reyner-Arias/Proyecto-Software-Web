const adminVideogameController = {};

const Videogame = require("../models/Videogame");
const mongodb = require("mongodb");

adminVideogameController.postVideogame = async (req, res) => {
  const newVideogame = new Videogame(req.body);
  await newVideogame.save();
  res.send("Videogame posted successfully");
};

module.exports = adminVideogameController;
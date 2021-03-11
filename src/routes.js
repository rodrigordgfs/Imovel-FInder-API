const express = require("express");
const routes = express.Router();

const CharacteristicsController = require("./Controllers/Characteristics");

routes.post("/api-imovel-finder/", CharacteristicsController.post);

module.exports = routes;

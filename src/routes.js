const express = require("express");
const routes = express.Router();
const { celebrate, Joi, errors, Segments } = require("celebrate");

const CharacteristicsController = require("./Controllers/Characteristics");

routes.post(
  "/api-imovel-finder/",
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      active: Joi.boolean().default(true),
    }),
  }),
  CharacteristicsController.post
);

module.exports = { routes, errors };

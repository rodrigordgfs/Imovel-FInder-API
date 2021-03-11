const express = require("express");
const routes = express.Router();
const { celebrate, Joi, errors, Segments } = require("celebrate");

const CharacteristicsController = require("./Controllers/Characteristics");

// CHARACTERISTICS
routes.post(
  "/api-imovel-finder/characteristics",
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      active: Joi.boolean().default(true),
    }),
  }),
  CharacteristicsController.post
);

routes.get(
  "/api-imovel-finder/characteristics",
  CharacteristicsController.getAll
);

routes.get(
  "/api-imovel-finder/characteristics/:id",
  CharacteristicsController.getByID
);

routes.delete(
  "/api-imovel-finder/characteristics/:id",
  CharacteristicsController.delete
);

routes.patch(
  "/api-imovel-finder/characteristics/:id",
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string(),
      active: Joi.boolean().default(true),
    }),
  }),
  CharacteristicsController.update
);

module.exports = { routes, errors };

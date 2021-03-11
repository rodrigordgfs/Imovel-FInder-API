const express = require("express");
const routes = express.Router();
const { celebrate, Joi, errors, Segments } = require("celebrate");

const CharacteristicsController = require("./Controllers/Characteristics");
const PropertyTypesController = require("./Controllers/PropertyTypes");

// CHARACTERISTICS
routes.post(
  "/api-imovel-finder/characteristics",
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      active: Joi.boolean().default(true),
    }),
  }),
  CharacteristicsController.create
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
      active: Joi.boolean(),
    }),
  }),
  CharacteristicsController.update
);

// PROPERTY TYPES
routes.post(
  "/api-imovel-finder/property-types",
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      icon: Joi.string().uri().required(),
      active: Joi.boolean().default(true),
    }),
  }),
  PropertyTypesController.create
);

routes.get("/api-imovel-finder/property-types", PropertyTypesController.getAll);

routes.get(
  "/api-imovel-finder/property-types/:id",
  PropertyTypesController.getByID
);

routes.delete(
  "/api-imovel-finder/property-types/:id",
  PropertyTypesController.delete
);

routes.patch(
  "/api-imovel-finder/property-types/:id",
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string(),
      icon: Joi.string().uri(),
      active: Joi.boolean(),
    }),
  }),
  PropertyTypesController.update
);

module.exports = { routes, errors };

const express = require("express");
const routes = express.Router();
const { celebrate, Joi, errors, Segments } = require("celebrate");

const CharacteristicsController = require("./Controllers/Characteristics");
const PropertyTypesController = require("./Controllers/PropertyTypes");
const Announcements = require("./Controllers/Announcements");

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

// ANNOUNCEMENTS
routes.post(
  "/api-imovel-finder/announcements",
  celebrate({
    [Segments.BODY]: Joi.object({
      title: Joi.string().max(70).required(),
      property_type_id: Joi.number().required(),
      price: Joi.number().required(),
      useful_area: Joi.number().required(),
      gross_area: Joi.number().required(),
      contruction_year: Joi.number().required(),
      detailed_description: Joi.string().required(),
      zipcode: Joi.string().max(15).required(),
      address: Joi.string().max(150).required(),
      address_number: Joi.string().max(20).required(),
      neighborhood: Joi.string().max(50).required(),
      city: Joi.string().max(50).required(),
      active: Joi.boolean().default(true),
    }),
  }),
  Announcements.create
);

routes.patch(
  "/api-imovel-finder/announcements/:id",
  celebrate({
    [Segments.BODY]: Joi.object({
      title: Joi.string().max(70),
      property_type_id: Joi.number(),
      price: Joi.number(),
      useful_area: Joi.number(),
      gross_area: Joi.number(),
      contruction_year: Joi.number(),
      detailed_description: Joi.string(),
      zipcode: Joi.string().max(15),
      address: Joi.string().max(150),
      address_number: Joi.string().max(20),
      neighborhood: Joi.string().max(50),
      city: Joi.string().max(50),
      active: Joi.boolean(),
    }),
  }),
  Announcements.update
);

routes.get("/api-imovel-finder/announcements/:id", Announcements.getByID);

routes.get("/api-imovel-finder/announcements", Announcements.getAll);

routes.delete("/api-imovel-finder/announcements/:id", Announcements.delete);

module.exports = { routes, errors };

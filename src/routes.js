"use strict";

const express = require("express");
const routes = express.Router();
const passport = require("passport");
const { celebrate, Joi, errors, Segments } = require("celebrate");

const CharacteristicsController = require("./Controllers/Characteristics");
const PropertyTypesController = require("./Controllers/PropertyTypes");
const AnnouncementsController = require("./Controllers/Announcements");
const AnnouncementPhotoController = require("./Controllers/AnnouncementPhotos");
const AnnouncementContactsController = require("./Controllers/AnnouncementContacts");
const UsersController = require("./Controllers/Users");

// CHARACTERISTICS
routes
  .post(
    "/api-imovel-finder/characteristics",
    passport.authenticate("bearer", { session: false }),
    celebrate({
      [Segments.BODY]: Joi.object({
        name: Joi.string().required(),
        active: Joi.boolean().default(true),
      }),
    }),
    CharacteristicsController.create
  )
  .get(
    "/api-imovel-finder/characteristics",
    passport.authenticate("bearer", { session: false }),
    CharacteristicsController.getAll
  )
  .get(
    "/api-imovel-finder/characteristics/:id",
    passport.authenticate("bearer", { session: false }),
    CharacteristicsController.getByID
  )
  .delete(
    "/api-imovel-finder/characteristics/:id",
    passport.authenticate("bearer", { session: false }),
    CharacteristicsController.delete
  )
  .patch(
    "/api-imovel-finder/characteristics/:id",
    passport.authenticate("bearer", { session: false }),
    celebrate({
      [Segments.BODY]: Joi.object({
        name: Joi.string(),
        active: Joi.boolean(),
      }),
    }),
    CharacteristicsController.update
  );

// PROPERTY TYPES
routes
  .post(
    "/api-imovel-finder/property-types",
    passport.authenticate("bearer", { session: false }),
    celebrate({
      [Segments.BODY]: Joi.object({
        name: Joi.string().required(),
        icon: Joi.string().uri().required(),
        active: Joi.boolean().default(true),
      }),
    }),
    PropertyTypesController.create
  )
  .get(
    "/api-imovel-finder/property-types",
    passport.authenticate("bearer", { session: false }),
    PropertyTypesController.getAll
  )
  .get(
    "/api-imovel-finder/property-types/:id",
    passport.authenticate("bearer", { session: false }),
    PropertyTypesController.getByID
  )
  .delete(
    "/api-imovel-finder/property-types/:id",
    passport.authenticate("bearer", { session: false }),
    PropertyTypesController.delete
  )
  .patch(
    "/api-imovel-finder/property-types/:id",
    passport.authenticate("bearer", { session: false }),
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
routes
  .post(
    "/api-imovel-finder/announcements",
    passport.authenticate("bearer", { session: false }),
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
    AnnouncementsController.create
  )
  .patch(
    "/api-imovel-finder/announcements/:id",
    passport.authenticate("bearer", { session: false }),
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
    AnnouncementsController.update
  )
  .get(
    "/api-imovel-finder/announcements/:id",
    passport.authenticate("bearer", { session: false }),
    AnnouncementsController.getByID
  )
  .get(
    "/api-imovel-finder/announcements",
    passport.authenticate("bearer", { session: false }),
    AnnouncementsController.getAll
  )
  .delete(
    "/api-imovel-finder/announcements/:id",
    passport.authenticate("bearer", { session: false }),
    AnnouncementsController.delete
  );

// ANNOUNCEMENTS CHARACTERISTICS
routes
  .post(
    "/api-imovel-finder/announcements/:id/characteristic",
    passport.authenticate("bearer", { session: false }),
    celebrate({
      [Segments.BODY]: Joi.object({
        characteristic_id: Joi.number().required(),
      }),
    }),
    AnnouncementsController.linkCharacteristic
  )
  .delete(
    "/api-imovel-finder/announcements/:announcement_id/characteristic/:characteristic_id",
    passport.authenticate("bearer", { session: false }),
    AnnouncementsController.unlinkCharacteristic
  );

// ANNOUNCEMENT PHOTOS
routes
  .post(
    "/api-imovel-finder/announcements/:announcement_id/photo",
    passport.authenticate("bearer", { session: false }),
    celebrate({
      [Segments.BODY]: Joi.object({
        url: Joi.string().uri().required(),
      }),
    }),
    AnnouncementPhotoController.create
  )
  .delete(
    "/api-imovel-finder/announcements/:announcement_id/photo/:announcement_photo_id",
    passport.authenticate("bearer", { session: false }),
    AnnouncementPhotoController.delete
  );

// ANNOUNCEMENTS CONTACT
routes
  .post(
    "/api-imovel-finder/announcements/:announcement_id/contact",
    passport.authenticate("bearer", { session: false }),
    celebrate({
      [Segments.BODY]: Joi.object({
        full_name: Joi.string().max(60).required(),
        email: Joi.string().email().max(100).required(),
        phone: Joi.string().max(14).required(),
        has_whatsapp: Joi.boolean().required(),
      }),
    }),
    AnnouncementContactsController.create
  )
  .patch(
    "/api-imovel-finder/announcements/:announcement_id/contact",
    passport.authenticate("bearer", { session: false }),
    celebrate({
      [Segments.BODY]: Joi.object({
        full_name: Joi.string().max(60),
        email: Joi.string().email().max(100),
        phone: Joi.string().max(14),
        has_whatsapp: Joi.boolean(),
      }),
    }),
    AnnouncementContactsController.update
  );

// USERS
routes
  .post(
    "/api-imovel-finder/users",
    celebrate({
      [Segments.BODY]: Joi.object({
        email: Joi.string().email().max(100).required(),
        password: Joi.string().max(50).required(),
        full_name: Joi.string().max(100).required(),
      }),
    }),
    UsersController.create
  )
  .post(
    "/api-imovel-finder/users/login",
    passport.authenticate("local", { session: false }),
    UsersController.login
  )
  .post(
    "/api-imovel-finder/users/logout/:id",
    passport.authenticate("bearer", { session: false }),
    UsersController.logout
  )
  .patch(
    "/api-imovel-finder/users/:id",
    passport.authenticate("bearer", { session: false }),
    celebrate({
      [Segments.BODY]: Joi.object({
        email: Joi.string().email().max(100),
        password: Joi.string().max(50),
        full_name: Joi.string().max(100),
      }),
    }),
    UsersController.update
  )
  .get(
    "/api-imovel-finder/users/:id",
    passport.authenticate("bearer", { session: false }),
    UsersController.getByID
  );

module.exports = { routes, errors };

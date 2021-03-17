"use strict";

const Announcements = require("../models/Announcements");
const NotFound = require("../errors/NotFound");

exports.create = async (body) => {
  const data = await Announcements.create(body);
  const result = await this.getByID(data.id);
  return result;
};

exports.getByID = async (id) => {
  const result = await Announcements.findByPk(id, {
    attributes: [
      "id",
      "title",
      "price",
      "useful_area",
      "gross_area",
      "contruction_year",
      "detailed_description",
      "zipcode",
      "address",
      "address_number",
      "neighborhood",
      "city",
    ],
    include: [
      {
        association: "user",
        attributes: ["id", "full_name", "email"],
      },
      {
        association: "contact",
        attributes: ["full_name", "email", "phone", "has_whatsapp"],
      },
      {
        association: "property_type",
        attributes: ["id", "name", "icon"],
      },
      {
        association: "characteristics",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
      {
        association: "photos",
        attributes: ["id", "url"],
      },
    ],
  });
  if (!result) {
    throw new NotFound("Announcement not found.");
  }
  return result;
};

exports.getAll = async () => {
  return await Announcements.findAll({
    attributes: [
      "id",
      "title",
      "price",
      "useful_area",
      "gross_area",
      "contruction_year",
      "detailed_description",
      "zipcode",
      "address",
      "address_number",
      "neighborhood",
      "city",
    ],
    include: [
      {
        association: "user",
        attributes: ["id", "full_name", "email"],
      },
      {
        association: "contact",
        attributes: ["full_name", "email", "phone", "has_whatsapp"],
      },
      {
        association: "property_type",
        attributes: ["id", "name", "icon"],
      },
      {
        association: "characteristics",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
      {
        association: "photos",
        attributes: ["id", "url"],
      },
    ],
  });
};

exports.delete = async (id) => {
  await this.getByID(id);
  return await Announcements.destroy({ where: { id } });
};

exports.update = async (id, body) => {
  await this.getByID(id);
  return await Announcements.update(body, { where: { id } });
};

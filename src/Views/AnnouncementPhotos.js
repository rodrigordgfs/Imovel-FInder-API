"use strict";

const AnnouncementPhoto = require("../models/AnnouncementPhotos");
const NotFound = require("../errors/NotFound");

exports.create = async (body) => {
  return await AnnouncementPhoto.create(body);
};

exports.getByID = async (id) => {
  const result = await AnnouncementPhoto.findByPk(id);
  if (!result) {
    throw new NotFound("Announcement Photo not found.");
  }
  return result;
};

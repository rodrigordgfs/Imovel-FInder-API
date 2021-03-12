"use strict";

const AnnouncementPhoto = require("../models/AnnouncementPhotos");
const NotFound = require("../errors/NotFound");
const Announcement = require("../Views/Announcements");

exports.create = async (body) => {
  await Announcement.getByID(body.announcement_id);
  return await AnnouncementPhoto.create(body);
};

exports.delete = async (announcement_id, announcemente_photo_id) => {
  await Announcement.getByID(announcement_id);
  await this.getByID(announcemente_photo_id);
  return await AnnouncementPhoto.destroy({
    where: { id: announcemente_photo_id },
  });
};

exports.getByID = async (id) => {
  const result = await AnnouncementPhoto.findByPk(id);
  if (!result) {
    throw new NotFound("Announcement Photo not found.");
  }
  return result;
};

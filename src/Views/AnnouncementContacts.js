"use strict";

const AnnouncementContacts = require("../models/AnnouncementContacts");
const AlreadyExists = require("../errors/AlreadyExists");
const Announcement = require("../Views/Announcements");

exports.create = async (body) => {
  await Announcement.getByID(body.announcement_id);
  const result = await AnnouncementContacts.findOne({
    where: { announcement_id: body.announcement_id },
  });
  if (result) {
    throw new AlreadyExists("Contact for this announcement already exists.");
  }
  return await AnnouncementContacts.create(body);
};

exports.update = async (id, body) => {
  await Announcement.getByID(id);
  return await AnnouncementContacts.update(body, {
    where: { announcement_id: id },
  });
};

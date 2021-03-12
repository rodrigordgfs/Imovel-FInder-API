"use strict";

const AnnouncementContacts = require("../models/AnnouncementContacts");
const AlreadyExists = require("../errors/AlreadyExists");

exports.create = async (body) => {
  const result = await AnnouncementContacts.findOne({
    where: { announcement_id: body.announcement_id },
  });
  if (result) {
    throw new AlreadyExists("Contact for this announcement already exists.");
  }
  return await AnnouncementContacts.create(body);
};

exports.update = async (id, body) => {
  return await AnnouncementContacts.update(body, {
    where: { announcement_id: id },
  });
};

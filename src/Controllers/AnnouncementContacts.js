"use strict";

const AnnouncementContacts = require("../Views/AnnouncementContacts");

exports.create = async (req, res, next) => {
  try {
    const announcement_id = req.params.announcement_id;
    const body = req.body;
    const data = Object.assign({}, body, { announcement_id });
    const result = await AnnouncementContacts.create(data);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const announcement_id = req.params.announcement_id;
    const body = req.body;
    await AnnouncementContacts.update(announcement_id, body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

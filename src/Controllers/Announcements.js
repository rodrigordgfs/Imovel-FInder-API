"use strict";

const Announcements = require("../Views/Announcements");
const Characteristic = require("../Views/Characteristics");

exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await Announcements.create(body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

exports.getByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Announcements.getByID(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await Announcements.getAll();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Announcements.delete(id);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await Announcements.update(id, body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.linkCharacteristic = async (req, res, next) => {
  try {
    const announcement_id = req.params.id;
    const characteristic_id = req.body.characteristic_id;
    let announcement = await Announcements.getByID(announcement_id);
    const characteristic = await Characteristic.getByID(characteristic_id);
    await announcement.addCharacteristic(characteristic);
    announcement = await Announcements.getByID(announcement_id);
    res.status(201).send(announcement);
  } catch (error) {
    next(error);
  }
};

exports.unlinkCharacteristic = async (req, res, next) => {
  try {
    const announcement_id = req.params.announcement_id;
    const characteristic_id = req.params.characteristic_id;
    let announcement = await Announcements.getByID(announcement_id);
    const characteristic = await Characteristic.getByID(characteristic_id);
    await announcement.removeCharacteristic(characteristic);
    announcement = await Announcements.getByID(announcement_id);
    res.status(201).send(announcement);
  } catch (error) {
    next(error);
  }
};

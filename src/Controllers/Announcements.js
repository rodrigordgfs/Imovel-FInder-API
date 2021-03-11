const Announcements = require("../Views/Announcements");

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
    await Announcements.getByID(id);
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
    await Announcements.getByID(id);
    await Announcements.update(id, body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

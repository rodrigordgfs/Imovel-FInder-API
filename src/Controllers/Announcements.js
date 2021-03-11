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

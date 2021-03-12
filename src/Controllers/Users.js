const Users = require("../Views/Users");

exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await Users.create(body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await Users.update(id, body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.getByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Users.getByID(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

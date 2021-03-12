const AnnouncementPhoto = require("../models/AnnouncementPhotos");
const NotFound = require("../errors/NotFound");

module.exports = {
  async create(body) {
    return await AnnouncementPhoto.create(body);
  },

  async delete(id) {
    return await AnnouncementPhoto.destroy({ where: { id } });
  },

  async getByID(id) {
    const result = await AnnouncementPhoto.findByPk(id);
    if (!result) {
      throw new NotFound("Announcement Photo not found.");
    }
    return result;
  },
};

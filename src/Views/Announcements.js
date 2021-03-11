const Announcements = require("../models/Announcements");
const NotFound = require("../errors/NotFound");

module.exports = {
  async create(body) {
    const data = await Announcements.create(body);
    const result = await this.getByID(data.id);
    return result;
  },

  async getByID(id) {
    const result = await Announcements.findByPk(id, {
      attributes: [
        "id",
        "title",
        "price",
        "useful_area",
        "gross_area",
        "contruction_year",
        "detailed_description",
        "zipcode",
        "address",
        "address_number",
        "neighborhood",
        "city",
      ],
      include: {
        association: "property_type",
        attributes: ["id", "name", "icon"],
      },
    });
    if (!result) {
      throw new NotFound("Announcement not found.");
    }
    return result;
  },
};

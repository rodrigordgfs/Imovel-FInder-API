const AnnouncementPhoto = require("../Views/AnnouncementPhotos");
const Announcement = require("../Views/Announcements");

exports.create = async (req, res, next) => {
  try {
    const announcement_id = req.params.announcement_id;
    const body = req.body;
    await Announcement.getByID(announcement_id);
    const data = Object.assign({}, body, { announcement_id });
    const result = await AnnouncementPhoto.create(data);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const announcement_id = req.params.announcement_id;
    const announcemente_photo_id = req.params.announcement_photo_id;
    await Announcement.getByID(announcement_id);
    await AnnouncementPhoto.getByID(announcemente_photo_id);
    await AnnouncementPhoto.delete(announcemente_photo_id);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

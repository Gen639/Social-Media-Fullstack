const User = require("../models/User");

const UploadController = {
  async uploadImage(req, res, next) {
    try {
      if (!req.file || !req.file.path) {
        throw new Error("No file uploaded");
      }

      const user = await User.findById(req.user._id).exec();

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      await User.findByIdAndUpdate(
        req.user._id,
        { profileImg: req.file.path },
        { new: true }
      );
      res.status(200).send({
        message: "You have added user's profile image ",
        file: req.file,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

module.exports = UploadController;

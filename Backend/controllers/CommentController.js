const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

const CommentController = {
  async create(req, res, next) {
    try {
      const comment = await Comment.create({
        ...req.body,
        userId: req.user._id,
      });
      const post = await Post.findOne({ _id: req.body.postId });
      if (!post) {
        res.status(400).send({ message: "The post was not found" });
      }

      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { commentedPostsIds: req.body.postId } },
        { new: true }
      );
      await Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { commentsIds: comment._id } },
        { new: true }
      );
      res.status(200).send({ message: "You have just commented", comment });
    } catch (error) {
      console.error(error);
      error.origin = "user";
      next(error);
    }
  },
  async update(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params._id,
        { content: req.body.content },
        { new: true }
      );

      console.log(comment);
      if (!comment) {
        return res.status(404).send({ message: "The comment not found" });
      }

      res.status(200).send({
        message: "You have updated your comment successfully",
        comment,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem updating your comment",
      });
    }
  },
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10, title, postId } = req.query;
      const searchConditions = {};
      if (title) {
        searchConditions.title = { $regex: new RegExp(title, "i") };
      }
      if (postId) {
        searchConditions.postId = postId;
      }
      const comments = await Comment.find({ ...searchConditions })
        // .populate("comments.userId")
        .limit(limit)
        .skip((page - 1) * limit);
      res.status(200).send(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem retriving comments",
      });
    }
  },
  async delete(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params._id, {
        new: true,
      });
      res.status(200).send({
        message: "You have successfully deleted the comment",
        comment,
      });
    } catch (error) {}
  },
};

module.exports = CommentController;

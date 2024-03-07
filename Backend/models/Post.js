const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    // email: {
    //   type: String,
    //   ref: "User",
    //   required: [true, "Please write your email"],
    // },
    title: {
      type: String,
      required: [true, "Please write a title of you post"],
    },
    content: {
      type: String,
      required: [true, "Please write some content for your post"],
    },
    image: {
      type: String,
    },
    likes: [
      {
        userId: ObjectId,
        like: Boolean,
      },
    ],
    commentsIds: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

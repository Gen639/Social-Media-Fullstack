const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const {
  authentication,
  isAuthorPost,
} = require("../middlewares/authentication");

// create post with authentication
router.post("/", authentication, PostController.create);
//update post with authentication
router.put("/id/:_id", authentication, isAuthorPost, PostController.update);
// delete with authentication
router.delete("/id/:_id", authentication, isAuthorPost, PostController.delete);
// get all posts with users and comments (develope the comment first) + search by title and id (queries)
router.get("/getAll", PostController.getAll);

// Like a post with authentication
router.put("/like/:_id", authentication, PostController.like);
// Unlike a post with authentication
router.delete("/unlike/:_id", authentication, PostController.unlike);

module.exports = router;

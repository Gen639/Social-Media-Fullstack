const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const {
  authentication,
  isAuthorComment,
} = require("../middlewares/authentication");

// create comment
router.post("/", authentication, CommentController.create);
router.put(
  "/id/:_id",
  authentication,
  isAuthorComment,
  CommentController.update
);
router.get("/getAll", authentication, CommentController.getAll);
router.delete(
  "/id/:_id",
  authentication,
  isAuthorComment,
  CommentController.delete
);

module.exports = router;

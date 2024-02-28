const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserController = {
  // Endpoint para registrar un usuario utilizando bcrypt
  async create(req, res, next) {
    try {
      const password = bcrypt.hashSync(req.body.password, 10);

      const user = await User.create({
        ...req.body,
        password,
        role: "user",
      });

      res.status(201).send({ message: "User succesfully registered", user });
    } catch (error) {
      console.error(error);
      error.origin = "usuario";
      next(error);
    }
  },

  // Endpoint login(utilizando bcrypt +JWT)
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      const isMatch = bcrypt.compareSync(req.body.password, user.password);

      if (!user || !isMatch) {
        return res
          .status(400)
          .send({ message: "User or Password are incorrect" });
      }

      const token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.status(200).send({ message: "Login successful", user });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  // Endpoint of users by id
  async getUserByID(req, res) {
    try {
      //const user = await User.findById(req.user.id);
      const user = await User.findOne({ _id: req.params._id });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send({ user });
    } catch (error) {
      console.error("Error fetching user information:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  // Endpoint to get info od connected user
  async getUserConnected(req, res) {
    try {
      const user = await User.findOne({ tokens: req.headers.authorization });
      if (!user) {
        return res.status(401).send({ message: "Unauthorized: Invalid token" });
      }
      res
        .status(200)
        .send({ message: "Info about currently connected user:", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem getting the info of the connected user",
      });
    }
  },

  // Endpoint logout

  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });

      res.send({ message: "Successfully logged out" });
    } catch (error) {
      console.error(error);

      res.status(500).send({
        message: "There was a problem disconnecting",
      });
    }
  },
};
module.exports = UserController;

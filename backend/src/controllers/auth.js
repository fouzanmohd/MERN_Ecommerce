const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user)
      return res.status(400).json({
        message: "User already Exist!",
      });

    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      email,
      lastName,
      username: Math.random().toString(),
      password,
    });

    _user.save((err, data) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Something went wrong! Try again" });
      if (data)
        return res.status(201).json({ message: "User created successfully!" });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ err });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const {
          _id,
          firstName,
          lastName,
          username,
          email,
          role,
          password,
          fullName,
        } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            username,
            email,
            role,
            password,
            fullName,
          },
        });
      } else {
        return res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  });
};

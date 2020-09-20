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
                const {
                    _id,
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                    fullName,
                } = user;
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,
                        username,
                        email,
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

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
};
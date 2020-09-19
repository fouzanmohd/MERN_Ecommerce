const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user)
            return res.status(400).json({
                message: "Admin already Exist!",
            });

        const { firstName, lastName, email, password } = req.body;
        const _user = new User({
            firstName,
            role: "admin",
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
                return res.status(201).json({ message: "Admin created successfully!" });
        });
    });
};

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (err) return res.status(400).json({ err });
        console.log(user);
        if (user) {
            if (user.authenticate(req.body.password) && user.role === "admin") {
                const {
                    _id,
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                    fullName,
                    role,
                } = user;
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        role,
                        firstName,
                        lastName,
                        username,
                        email,
                        password,
                        fullName,
                    },
                });
            } else {
                return res.status(400).json({ message: "Invalid email or Password" });
            }
        } else {
            return res.status(400).json({ message: "Invalid email or Password" });
        }
    });
};

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
};
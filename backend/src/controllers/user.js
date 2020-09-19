const User = require("../models/user");

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
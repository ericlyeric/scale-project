const User = require('../models/user.model');

exports.user_is_authenticated = function (req, res) {
    console.log("TBD");
}

exports.user_all = function (req, res) {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.user_add = function (req, res) {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}
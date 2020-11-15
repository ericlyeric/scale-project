const User = require('../models/user.model');

exports.user_is_authenticated = function (req, res) {
    const { username, role } = req.user;
    res.status(200).json({
        isAuthenticated: true,
        user: {
            username: username
        }
    })
}

exports.user_all = function (req, res) {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.user = function (req, res) {
    User.find({ username: req.username }).exec(function (err, document) {
        if (err) {
            res.status(500).json({
                message: {
                    body: 'Error has occured',
                    error: true
                }
            })
        } else {
            res.statu(200).json({
                username: document.username,
                weight: document.map(element => element.weight),
                date: document.map(element => element.date),
                isAuthenticated: true
            })
        }
    })
}

exports.user_add = function (req, res) {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}
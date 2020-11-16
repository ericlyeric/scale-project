const User = require('../models/user.model');

exports.user_is_authenticated = function (req, res) {
    const { username } = req.user;
    res.status(200).json({
        isAuthenticated: true,
        user: {
            username: username
        }
    })
}

exports.get_user = function (req, res) {
    const username = req.user ? req.user.username : req.params.username;
    User.findOne({ username: username }, 'username weights', function (err, user) {
        if (err) {
            res.status(500).json({
                message: {
                    body: 'Error has occured',
                    error: true
                }
            }) 
        } else {
            res.status(200).json({
                username: user.username,
                weights: user.weights.map(element => {
                    return {
                        weight: parseFloat(element.weight),
                        date: element.date,
                        createdAt: element.createdAt,
                        updatedAt: element.updatedAt
                    }
                }),
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
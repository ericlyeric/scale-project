const User = require('../models/user.model');
const { signToken } = require('../auth/passport');

exports.auth_register = function (req, res) {
    const { username, email, password } = req.body;
    User.findOne({ username }, function (err, user) {
        if (err) {
            exports.status(500).json({
                message: { 
                    body: 'Error has occured', 
                    error: true 
                }
            });
        }
        if (user) {
            res.status(400).json({
                message: {
                    body: 'Username is already taken',
                    error: true,
                }
            })
        } else {
            const newUser = new User({ username, email, password });
            newUser.save(function (err) {
                if (err) {
                    res.status(500).json({
                        message: {
                            body: 'Error has occured',
                            error: true
                        }
                    });
                } else {
                    res.status(201).json({
                        message: {
                            body: 'Account successfully created',
                            error: false
                        }
                    })
                }
            })
        }
    })
}

exports.auth_login = function (req, res) {
    if (req.isAuthenticated()) {
        const { _id, username } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: true
        });
        res.status(200).json({
            isAuthenticated: true,
            user: { username }
        })
    }
}

exports.auth_logout = function (req, res) {
    res.clearCookie('access_token');
    res.json({
        user: {
            username: ''
        },
        success: true
    })
}
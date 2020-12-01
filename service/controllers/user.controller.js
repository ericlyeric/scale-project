const User = require('../models/user.model');

exports.get_user = function (req, res) {
    const { _id } = req.user;
    User.findOne({ _id }, 'username weights', function (err, user) {
        if (err) {
            res.status(500).json({
                message: {
                    body: 'Error has occured',
                    error: true
                }
            }) 
        } else {
            res.status(200).json({
                user: {
                    id: _id,
                    username: user.username,
                    weights: user.weights.map(element => {
                        return {
                            id: element._id,
                            weight: parseFloat(element.weight),
                            date: element.date,
                            createdAt: element.createdAt,
                            updatedAt: element.updatedAt
                        }
                    }),
                },
                isAuthenticated: true
            })
        }
    })
}

exports.add_weight = function (req, res) {
    const { weight, date, _id } = req.body;
    User.findById( req.params.id, 'weights', function (err, user) {
        if (user.weights.id(_id)) {
            user.weights.id(_id).weight = weight;
            user.weights.id(_id).date = date;
            user.save()
                .then(() => res.json('Weight updated'))
                .catch(err => res.status(400).json('Error could not update' + err))
        }
        else {
            user.weights.push({
                weight,
                date
            });
            user.save()
                .then(() => res.json('Weight added'))
                .catch(err => res.status(400).json('Error could not add ' + err))
        }
    })
}

exports.remove_weight = function (req, res) {
    const { _id } = req.body;
    User.findById( req.params.id, function (err, user) {
        if (user.weights.id(_id)) {
            const index = user.weights.indexOf(user.weights.id(_id));
            if (index > -1) {
                user.weights.splice(index, 1);
            }
            user.save()
                .then(() => res.json('Weight deleted'))
                .catch(err => res.status(400).json('Error could not delete' + err))
        } else {
            if (err) {
                res.status(500).json({
                    message: {
                        body: 'Error has occured',
                        error: true
                    }
                }) 
            } else {
                res.status(400).json('Weight not found');
            }
        }
    })
}
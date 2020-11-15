const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

function cookieExtractor(req) {
    let token = null;
    if (req && res.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
}

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: cookieExtractor,
            secretOrKey: 'Saitama',
        },
        function (payload, done) {
            User.findById({ _id: payload.sub }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
        }
    )
)

exports.signToken = function (userId) {
    return jwt.sign(
        {
            iss: 'Saitama',
            sub: userId,
        },
        'Saitama',
        { expiresIn: '1h' }
    )
}

passport.use(
    new LocalStrategy(function (username, password, done){
        User.findOne({ username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            } 
            user.comparePassword(password, done);
        })
    })
)

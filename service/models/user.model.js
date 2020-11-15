const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const WeightSchema = require('./weight.model');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "can't be blank"],
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 16,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
        index: true
    },
    email: { 
        type: String, 
        lowercase: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true 
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true})

UserSchema.plugin(uniqueValidator, { message: 'is already taken'});

UserSchema.pre('save', function(next) {
    let self = this;
    if (!self.isModified('password')) {
        return next();
    };
    bcrypt.hash(self.password, 10, function (err, passwordHash) {
        if (err) {
          return next(err);
        }
        self.password = passwordHash;
        next();
    });    
})

UserSchema.methods.comparePassword = function (password, cb) {
    let self = this;
    bcrypt.compare(password, self.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        } else {
            if (!isMatch) {
                return cb(null, isMatch);
            }
            return cb(null, self);
        }
    })
};

module.exports = mongoose.model('User', UserSchema);;
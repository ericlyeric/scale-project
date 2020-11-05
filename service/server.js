const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const passport = require('passport');
const Strategy = require('passport-facebook').Strategy

require('dotenv').config();

passport.use(new Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/return',
},
function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB databse connection established successfully")
})

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const weightsRouter = require('./routes/weights');

app.use('/', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/weights', weightsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// const passport = require('passport');
// const Strategy = require('passport-facebook').Strategy

const app = express();

require('dotenv').config({
    path: './config/config.env'
});

app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    app.use(morgan('dev'));
}

const port = process.env.PORT || 3001;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB databse connection established successfully")
})

// load all routes
const authRouter = require('./routes/auth.route');
const loginRouter = require('./routes/login.route');
const usersRouter = require('./routes/users.route');
const weightsRouter = require('./routes/weights.route');

// use routes
app.use('/api', authRouter);
app.use('/', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/weights', weightsRouter);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page not found"
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
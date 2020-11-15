const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectToDb } = require('./config/connection');

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
connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(cors());

// load all routes
const authRouter = require('./routes/auth.route');
const usersRouter = require('./routes/users.route');
const weightsRouter = require('./routes/weights.route');

// use routes
app.use('/api', authRouter);
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
require('dotenv').config();
const mongoose = require('mongoose');

exports.connectToDb = async function () {
    const mongoDB = process.env.MONGODB_LOCAL ? 
        process.env.MONGODB_LOCAL : process.env.MONGODB_CLOUD;
    await mongoose.connect(
        mongoDB,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        },
        () => {
            console.log('successfully connected to database');
        }
    );
    const db = mongoose.connection;
    db.on(
        'error',
        console.error.bind(console, 'MongoDB connection error')
    );
}
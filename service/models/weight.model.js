const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const weightSchema = new Schema({
    weight: { type: mongoose.Decimal128, index: true },
    date: { type: Date, index: true}
}, {
    timestamps: true,
});

const Weight = mongoose.model('Weight', weightSchema);

module.exports = Weight;
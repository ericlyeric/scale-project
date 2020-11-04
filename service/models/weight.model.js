const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const weightSchema = new Schema({
    weight: { type: mongoose.Decimal128, required: true },
    date: { type: Date, required: true}
}, {
    timestamps: true,
});

const Weight = mongoose.model('Weight', weightSchema);

module.exports = Weight;
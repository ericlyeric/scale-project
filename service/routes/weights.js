const router = require('express').Router();
let Weight = require('../models/weight.model');

router.route('/').get((req, res) => {
    Weight.find()
        .then(weights => res.json(weights))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const weight = parseFloat(req.body.weight);
    const date = Date.parse(req.body.date);

    const newWeight = new Weight({weight, date});

    newWeight.save()
        .then(() => res.json('Weight added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Weight.findById(req.params.id)
        .then(weight => res.json(weight))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Weight.findByIdAndDelete(req.params.id)
        .then(() => res.json('Weight deleted'))
        .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/update/:id').post((req, res) => {
    Weight.findById(req.params.id)
        .then(weight => {
            weight.weight = parseFloat(req.body.weight);
            weight.date = Date.parse(req.body.date);

            weight.save()
                .then(() => res.json('Weight updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
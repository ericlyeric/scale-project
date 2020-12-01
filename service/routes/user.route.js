const router = require('express').Router();
const passport = require('passport');
const user_controller = require('../controllers/user.controller');

router.get(
    '/is-authenticated', 
    passport.authenticate('jwt', { session: false}),
    user_controller.get_user
);

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false}),
    user_controller.add_weight
)

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false}),
    user_controller.remove_weight
)

module.exports = router;
const router = require('express').Router();
const passport = require('passport');
const user_controller = require('../controllers/user.controller');

router.get(
    '/is-authenticated', 
    passport.authenticate('jwt', { session: false}),
    user_controller.user_is_authenticated
);

// remove after, only used for testing
router.get(
    '/:username', 
    passport.authenticate('jwt', { session: false }),
    user_controller.get_user
);

router.put(
    '/add-weight',
    passport.authenticate('jwt', { session: false}),
    user_controller.add_weight
)

module.exports = router;